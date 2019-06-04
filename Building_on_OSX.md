# Building on OS X

You will to pin yourself to node version 10.x for now.  Here is one way to do this.

## Install Homebrew

```
cd $HOME
mkdir homebrew && curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C homebrew
brew install  node@10
```

## Setup your paths

Add the following to your .profile/.bashrc:

```
export PATH="$HOME/homebrew/opt/node@10/bin:$PATH"
export PATH=$HOME/bin:$HOME/homebrew/bin:$HOME/homebrew/sbin:$PATH

# For compilers to find node@10 you may need to set:
export LDFLAGS="${LDFLAGS} -L${HOME}/homebrew/opt/node@10/lib"
export CPPFLAGS="${CPPFLAGS} -I${HOME}/homebrew/opt/node@10/include"
```

## Continue with regular development

See [how to build](README.md) for build steps.
