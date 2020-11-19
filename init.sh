## Install docs packages
yarn install

# Initialise submodule
git submodule update --init --recursive
git submodule update --remote --merge

# Install website packages
cd website
yarn install
cd ..
