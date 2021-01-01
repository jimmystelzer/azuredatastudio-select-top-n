'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// The module 'azdata' contains the Azure Data Studio extensibility API
// This is a complementary set of APIs that add SQL / Data-specific functionality to the app
// Import the module and reference it with the alias azdata in your code below

import * as azdata from 'azdata';

// Select Top N extension class
import { SelectTopN } from './SelectTopN';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    context.subscriptions.push(vscode.commands.registerCommand('azuredatastudio-select-top-n.top10', async (context: azdata.ObjectExplorerContext) => {
        await SelectTopN.generateSelectQuery(context, 10, true);
    }));

    context.subscriptions.push(vscode.commands.registerCommand('azuredatastudio-select-top-n.top100', async (context: azdata.ObjectExplorerContext) => {
        await SelectTopN.generateSelectQuery(context, 100, true);
    }));

    context.subscriptions.push(vscode.commands.registerCommand('azuredatastudio-select-top-n.topN', async (context: azdata.ObjectExplorerContext) => {
        let topN = await vscode.window.showInputBox({ 
            value: "1000", 
            prompt: `Enter number of rows do you like to select`, 
            validateInput: (value) => (
                    value && 
                    Number.isNaN(Number(value) as any) ? 'Must be a number' : undefined &&
                    Number.isInteger(Number(value))
                )
        });
        if (!topN) {
            vscode.window.showErrorMessage("You need to enter a valid number of results.");
            return;
        }
        let topNInteger = Number.parseInt(topN);
        await SelectTopN.generateSelectQuery(context, topNInteger, true);
    }));

    context.subscriptions.push(vscode.commands.registerCommand('azuredatastudio-select-top-n.topNDontAutoRun', async (context: azdata.ObjectExplorerContext) => {
        let topN = await vscode.window.showInputBox({ 
            value: "1000", 
            prompt: `Enter number of rows do you like to select`, 
            validateInput: (value) => (
                    value && 
                    Number.isNaN(Number(value) as any) ? 'Must be a number' : undefined &&
                    Number.isInteger(Number(value))
                )
        });
        if (!topN) {
            vscode.window.showErrorMessage("You need to enter a valid number of results.");
            return;
        }
        let topNInteger = Number.parseInt(topN);
        await SelectTopN.generateSelectQuery(context, topNInteger, false);
    }));
}

// this method is called when your extension is deactivated
export function deactivate() {
}

