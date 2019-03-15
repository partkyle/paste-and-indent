# paste-and-indent README

This is simple plugin that attempts to recreate the "Paste and Indent" feature in Sublime Text.

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
