# A temporary fork of [React Mentions](http://signavio.github.io/react-mentions)

This is a temproary fork of [React Mentions](http://signavio.github.io/react-mentions) that contains a snapshot of the PR signavio/react-mentions#255 . This repo takes a snapshot from zenchef/react-mentions#feature/custom-regex-pr and makes minimal changes to allow it to be referenced directly from npm. The only changes are committing the build output directories (`es`, `lib`, `umd`) and updating `.gitignore` to not ignore them.

I was using a `prepare` script to the `package.json` that builds the necessary output files upon installing the package, but for ancient builds of npm `prepare` wasn't supported.
