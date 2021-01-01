'use strict';

import * as vscode from 'vscode';
import * as azdata from 'azdata';


export class SelectTopN {

    constructor() {
    }

    static async generateSelectQuery(context: azdata.ObjectExplorerContext, topN:Number, autoRun:boolean) {
        try{
            if (!context ) {
                vscode.window.showInformationMessage("This cannot run from command menu.");
                return;
            }
            let connection = await azdata.connection.getCurrentConnection();
            let connectionId = (connection) ? connection.connectionId : undefined;

            if(!connection || !connectionId || !context.connectionProfile || !context.nodeInfo || !context.nodeInfo.metadata){
                vscode.window.showInformationMessage("You need to be connected to run this.");
                return;
            }
            let connectionUri = await azdata.connection.getUriForConnection(connectionId);
            let queryProvider = azdata.dataprotocol.getProvider<azdata.QueryProvider>(connection.providerId,azdata.DataProviderType.QueryProvider);
            let tableName: string = `[${context.connectionProfile.databaseName}].[${context.nodeInfo.metadata.schema}].[${context.nodeInfo.metadata.name}]`;
            let query = `USE ${context.connectionProfile.databaseName}; SELECT [COLUMN_NAME] FROM INFORMATION_SCHEMA.COLUMNS WHERE [TABLE_NAME]='${context.nodeInfo.metadata.name}' AND [TABLE_SCHEMA]='${context.nodeInfo.metadata.schema}'` ;
            let resultSchema = await queryProvider.runQueryAndReturn(connectionUri, query);
            if(resultSchema.rows.length > 0){
                let finalQuery = `SELECT TOP (${topN})\n`;
                resultSchema.rows.forEach(function(row){
                    finalQuery += `\t\t[${row[0].displayValue}],\n`;
                });
                finalQuery = finalQuery.slice(0,-2);

                finalQuery += `\n\tFROM ${tableName};`;

                await vscode.commands.executeCommand('explorer.query', context.connectionProfile);

                let editor = vscode.window.activeTextEditor;
                if(editor){
                    let doc = editor.document;
                    editor.edit(editContext => {
                        editContext.insert(new vscode.Position(0, 0), finalQuery);
                    });
                    if(autoRun){
                        vscode.commands.executeCommand('runQueryKeyboardAction');
                    }
                }
            }
        
        }
        catch(err)
        {
            vscode.window.showInformationMessage(err);
        }
    }
}