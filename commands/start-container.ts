import vscode = require('vscode');
import {ImageItem, quickPickImage} from './utils/quick-pick-image';


function doStartContainer(interactive: boolean) {
    quickPickImage(false).then(function (selectedItem: ImageItem) {
        if (selectedItem) {
            let option = interactive ? '-it' : '';
            let terminal = vscode.window.createTerminal(selectedItem.label);
            terminal.sendText(`docker run ${option} --rm ${selectedItem.label}`);
            terminal.show();
        }
    });
}

export function startContainer() {
    doStartContainer(false);
}

export function startContainerInteractive() {
    doStartContainer(true);
}

export function startAzureCLI() {
    let terminal: vscode.Terminal = vscode.window.createTerminal('Azure CLI');
    terminal.sendText(`docker run -it --rm microsoft/azure-cli:latest`);
    terminal.show();
    terminal.sendText(`azure login`);
}