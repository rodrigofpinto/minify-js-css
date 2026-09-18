import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import CleanCSS = require('clean-css');
import * as esbuild from 'esbuild';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('minify-js-css.minify', async (uri: vscode.Uri) => {
        if (!uri || !uri.fsPath) {
            vscode.window.showErrorMessage('No file selected.');
            return;
        }

        const inputPath = uri.fsPath;
        const parsedPath = path.parse(inputPath);

        if (parsedPath.name.endsWith('.min')) {
            vscode.window.showWarningMessage('The selected file already appears to be minified (contains ".min" in the name).');
            return;
        }

        try {
            let outputCode = '';

            if (parsedPath.ext === '.css') {
                const fileContent = fs.readFileSync(inputPath, 'utf8');
                const cleanCssOutput = new CleanCSS({
                    rebaseTo: parsedPath.dir 
                }).minify({ [inputPath]: { styles: fileContent } });

                if (cleanCssOutput.errors && cleanCssOutput.errors.length > 0) {
                    vscode.window.showErrorMessage(`CSS Error: ${cleanCssOutput.errors.join(', ')}`);
                    return;
                }
                outputCode = cleanCssOutput.styles;

            } else if (parsedPath.ext === '.js') {
                const result = await esbuild.build({
                    entryPoints: [inputPath],
                    bundle: true,
                    minify: true,
                    write: false,
                    absWorkingDir: parsedPath.dir, 
                    format: 'iife',
                });

                outputCode = result.outputFiles[0].text;

            } else {
                vscode.window.showErrorMessage('File format not supported.');
                return;
            }

            const outputPath = path.join(parsedPath.dir, `${parsedPath.name}.min${parsedPath.ext}`);
            fs.writeFileSync(outputPath, outputCode);
            vscode.window.showInformationMessage(`Esbuild bundled & minified: ${parsedPath.name}.min${parsedPath.ext}`);

        } catch (error: any) {
            const errorMessage = error.errors ? error.errors.map((e: any) => e.text).join(', ') : error.message;
            vscode.window.showErrorMessage(`Error minifying: ${errorMessage}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}