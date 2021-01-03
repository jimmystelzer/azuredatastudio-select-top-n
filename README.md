# Azure Data Studio Select Top N

This extension select the first N rows from tables and views. There is four new menus under the object browser that allow run the query to show the content of an table/view.

The objetive of this extension is make life easy when manage huge tables/views or tables that has complex column like blob/xml that can be manipuled before run the query.

## Features

This is a list of current features of this extension.

- Predefined select query that show 10 (ten) rows.
- Predefined select query that show 100 (hundred) rows.
- Configurable select query that show the requested number of rows.
- Configurable select query that generete the script without execure the query. To allow the user edit the query.

## Screenshots

![Select Top N Menu](https://raw.githubusercontent.com/jimmystelzer/azuredatastudio-select-top-n/master/artwork/azure_data_studio-select_top_n.png)

![Select Top N Dialog](https://raw.githubusercontent.com/jimmystelzer/azuredatastudio-select-top-n/master/artwork/azure_data_studio-select_top_n-dialog.png)

## Installation

The current release is available to [download as a .vsix file](https://github.com/jimmystelzer/azuredatastudio-select-top-n/releases/download/0.0.1/azuredatastudio-select-top-n-0.0.1.vsix) and can be installed by opening the command palette (`ctrl/command+shift+p`) and selecting `Extensions: Install from VSIX...`.

## Change Log

See the [Change Log](./CHANGELOG.md) for the full changes.
