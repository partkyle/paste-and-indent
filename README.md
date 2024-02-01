# paste-and-indent README

This is simple plugin that attempts to recreate the "Paste and Indent" feature in Sublime Text.

The main idea is that it takes a block selection you have, and it removes the leading whitespace, then pastes it in.

The intent is that you "double-click and drag" the text you want to copy to get a line selection, then copy that text to your clipboard. Then, if you use the `extension.paste-and-indent` command it will remove the leading whitespace from each line and paste it where you want it, and it should seamless paste in to the new section indenting as you would expect.

It's pretty rudimentary and probably only works if you have consistent indenting, but it works for my use cases and I use it heavily. It works exactly how it did when I used to use Sublime Text.

It should support multiple cursors as well.

## How I use this extension

I hate it when extensions add default keybindings. Eventually they end up conflicting. 

This is easy to set up yourself though, and you can choose what keys to use.

Open up the user keybindings JSON: Ctrl+Shift+P, then type `Preferences: Open Keyboard Shortcuts (JSON))`. Make sure you are open your own settings and not the `Default` ones.

I add the following JSON to my configuration. Make sure you use valid JSON!

```
    {
        "key": "ctrl+shift+v",
        "command": "extension.paste-and-indent",
        "when": "editorTextFocus"
    },
```

That's it. I've been using this pretty much as is since I wrote it.

## Features

Provides a command pallete item named "Paste and Indent" that will attempt to properly paste code if you are indented at the same indent level. It removes the prefix on block-selected code text that exists in the clipboard and attempts to remove the prefix and paste it in at the indent level.

It is multi-select safe.

There are no keybindings set, but you can set them yourself. I find that better since it's so
easy to create conflicts. I like "cmd+shift+v" myself.

## Requirements

None

## Extension Settings

None

## Known Issues

Caveats: It does not do anything smart about the content or reconciling the indentation with the current file.

It will only paste into whitespace only lines. It should probably paste normally on non-blank lines.

## Release Notes

Users appreciate release notes as you update your extension.

### 0.1.0

Initial release of paste-and-indent
