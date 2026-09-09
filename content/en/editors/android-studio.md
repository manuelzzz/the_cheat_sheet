---
title: Android Studio
description: Practical reference for project structure, the layout editor, debugging, Gradle, and emulators.
tags:
  - android
  - kotlin
  - mobile
---

## Project Structure

- **Modules** — `app/` is the main module; larger projects split code
  into feature/library modules, each with its own `build.gradle`.
- `AndroidManifest.xml` — declares activities, permissions, and app
  metadata.
- `res/` — resources: `layout/` (XML/Compose UI), `values/` (strings,
  colors, styles), `drawable/` (images/icons).
- `build.gradle` (module-level) vs `build.gradle` (project-level) —
  module-level configures that module's dependencies and build options;
  project-level configures repositories and plugin versions shared
  across modules.
- `gradle.properties` — build-wide settings (e.g. JVM args, feature
  flags).

## Layout Editor Basics

- **Design / Code / Split** view toggle — top-right of the editor,
  switch between visual editing, raw XML, or both side by side.
- **Component Tree** — shows the view hierarchy; useful for selecting
  nested views that overlap visually.
- **Constraint Layout** — the default layout type; drag from a view's
  edge to another view or the parent to create a constraint.
- **Attributes panel** — right-hand sidebar, edit the selected view's
  properties (size, margins, text, etc).
- Jetpack Compose previews (`@Preview` on a `@Composable` function)
  render directly in the editor without running the app.

## Debugging

- `Debug` (bug icon, or `Shift+F9`) — run the app with the debugger
  attached.
- Click the gutter next to a line to set a breakpoint.
- **Debug panel** — inspect variables, the call stack, and step
  through code (`Step Over` / `Step Into` / `Step Out`).
- **Logcat** — bottom panel showing `Log.d`/`Log.e` output and system
  logs from the device/emulator; filter by tag, process, or log level.
- **Layout Inspector** (`Tools → Layout Inspector`) — inspect a running
  app's view hierarchy and properties live, similar to browser dev tools.

## Gradle Basics

```groovy
// app/build.gradle
dependencies {
    implementation 'androidx.core:core-ktx:1.13.0'
    testImplementation 'junit:junit:4.13.2'
}
```

```bash
./gradlew assembleDebug     # build a debug APK
./gradlew installDebug        # build and install on a connected device
./gradlew test                  # run unit tests
./gradlew clean                   # remove build outputs
```

- `implementation` — a dependency used internally, not exposed to
  modules that depend on this one.
- **Sync Project with Gradle Files** (elephant icon, or after editing
  `build.gradle`) — re-resolves dependencies and configuration.

## Emulator Usage

- **Device Manager** (`Tools → Device Manager`) — create and manage
  virtual devices (AVDs).
- `Cold Boot` vs `Quick Boot` — Cold Boot starts from a clean state;
  Quick Boot resumes from a saved snapshot (faster).
- Drag-and-drop an APK file onto a running emulator to install it.
- Extended controls (`...` on the emulator toolbar) — simulate location,
  battery state, rotation, and network conditions.

## References

- [Android Studio User Guide](https://developer.android.com/studio/intro)
- [Debugging Your App](https://developer.android.com/studio/debug)
- [Configure Your Build](https://developer.android.com/build)
