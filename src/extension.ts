// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let handle_selection = (editor: vscode.TextEditor, builder: vscode.TextEditorEdit, selection: vscode.Selection, content: string) => {
	let start_line = new vscode.Position(selection.start.line, 0);
	let this_line = new vscode.Selection(start_line, selection.start);

	// this only really works when you have a block selection that is all
	// left aligned.

	// to normalize the paste block, we need to:
	// 1. look at the first line
	// 2. count the whitespace
	// 3. remove that exact content from every line

	// need to handle the case where every line starts with the same number of
	// whitespace characters. we should just be able to trim them.

	// simple scenario where the content is all left aligned
	// we just need to paste and repeat whatever the prefix
	// is before all of this.
	// Note: this won't work if there are different indent styles
	//       in the pasted code
	let line_contents = editor.document.getText(this_line);
	let line_match = line_contents.match(/^\s*$/);
	if (line_match && line_match.length > 0) {
		let line_prefix = line_match[0];
		let lines = content.split('\n');
		let new_content = lines.shift();
        if (new_content || new_content == '') {
			// remove a last blank line
			// there is almost always going to be a newline that ends up
			// by itself
			if (lines.length > 0 && lines[lines.length-1].match(/^\s*$/)) {
				lines.pop();
			}

			let r = /^\s*/;
			let match = new_content.match(r);
			if (match && match.length > 0) {
				// gotta remember to replace it
				new_content = new_content.replace(r, '');

				let prefix = match[0];
				lines = lines.map(line => {
					if (line.startsWith(prefix)) {
						return line.slice(prefix.length);
					}
					return line;
				});
			}

			lines = lines.map(line => { return line_prefix + line; });
			lines.unshift(new_content);
			new_content = lines.join('\n');

			if (new_content) {
				builder.replace(selection, new_content);
			}
		}
	}
};

let paste_and_indent = () => {
	let editor = vscode.window.activeTextEditor;

	if (editor) {
		let myedit = editor;

		vscode.env.clipboard.readText().then(content => {
			myedit.edit((builder: vscode.TextEditorEdit) => {
				myedit.selections.forEach(selection => {
					handle_selection(myedit, builder, selection, content);
				});
			}).then(success => {
				if (success) {
					myedit.selections = myedit.selections.map(selection => {
						return new vscode.Selection(selection.end, selection.end);
					});
				}
			});
		});


		// .then(success => {
		// 	myedit.selections.forEach(selection => {
		// 		let postion = selection.end;
		// 		selection = new vscode.Selection(postion, postion);
		// 	});
		// });

		// myedit.selections.forEach(selection => {
		// 	myedit.edit((editBuilder: vscode.TextEditorEdit) => {
		// 		editBuilder.replace(selection, "asdfasdfa");
		// 	}).then(success => {
		// 		if (success) {
		// 			console.log('thig thing alkjsdflkjasdflkj');
		// 			// make selection empty
		// 			var postion = myedit.selection.end;
		// 			selection = new vscode.Selection(postion, postion);
		// 		}
		// 	});
		// });
	}
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let indent = vscode.commands.registerCommand('extension.paste-and-indent', paste_and_indent);
	context.subscriptions.push(indent);

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed

	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World!');
	// });

	// context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
