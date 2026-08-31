---
title: Xcode
description: Practical reference for Xcode's project structure, Interface Builder, debugging, and simulators.
tags:
  - ios
  - macos
  - apple
---

## Project Structure

- `.xcodeproj` — a single project's build settings, targets, and file
  references.
- `.xcworkspace` — groups multiple projects (e.g. an app + its CocoaPods
  dependencies); open this instead of the `.xcodeproj` when it exists.
- **Targets** — a target defines how a product (app, framework, extension)
  is built: sources, resources, and build settings.
- **Schemes** — a scheme ties a target to a build configuration (Debug/
  Release) and run/test/archive actions.
- `Info.plist` — per-target configuration (bundle ID, permissions,
  supported orientations, etc).

## Interface Builder Basics

- `.storyboard` / `.xib` — visual layouts for UIKit; SwiftUI views are
  plain Swift files instead.
- **Auto Layout** — constraints define position/size relative to other
  views; select a view and use the constraint bar at the bottom-right of
  the canvas.
- **Outlets & Actions** — `Ctrl+drag` from a view to code to create an
  `@IBOutlet` (reference) or `@IBAction` (event handler).
- `Cmd+Option+Return` — toggle the SwiftUI canvas/preview alongside code.

## Debugging

- `Cmd+Y` — toggle breakpoints on/off without removing them.
- `Cmd+\` — add a breakpoint at the current line.
- **LLDB console** — available at the bottom of the debug area; use
  `po <expression>` to print an object's description.
- `View Debugging → Capture View Hierarchy` — inspect the live view tree
  and constraints of a running app.
- **Breakpoint navigator** (`Cmd+8`) — manage, disable, or add
  conditions/actions to breakpoints.

## Simulator Usage

- `Cmd+Shift+H` — go to Home screen.
- `Cmd+K` — toggle the software keyboard.
- `Cmd+Shift+4`-style screenshots via `Device → Trigger Screenshot`, or
  `Cmd+S` inside the Simulator app.
- `Device → Erase All Content and Settings` — reset a simulator to a clean
  state.
- `xcrun simctl list devices` — list simulators from the command line.
- `xcrun simctl boot "<name>"` — boot a specific simulator by name.

## Build Settings Basics

- **Build Configurations** — Debug and Release by default; control
  optimization level, `DEBUG` flags, and code signing per configuration.
- `Product → Clean Build Folder` (`Cmd+Shift+K`) — clear cached build
  artifacts when a build behaves inconsistently.
- **Build Phases** — per-target steps (compile sources, link binaries,
  copy resources, run scripts) shown in the target's settings.
- `xcodebuild -list` — inspect a project's schemes, targets, and
  configurations from the command line.

## References

- [Xcode Documentation](https://developer.apple.com/documentation/xcode)
- [Debugging with Xcode](https://developer.apple.com/documentation/xcode/debugging)
- [xcodebuild man page](https://developer.apple.com/library/archive/technotes/tn2339/_index.html)
