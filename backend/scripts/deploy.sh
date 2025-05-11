#!/bin/bash

# Exit immediately on error
set -e

DEPLOY_DIR="../../server"

echo "📦 Installing dependencies..."
npm install

echo "🔍 Generating Prisma client..."
npx prisma generate

echo "🗃️ Running database migrations..."
npx prisma migrate deploy

echo "🛠️ Building TypeScript..."
npx tsc

echo "🧹 Cleaning old deploy directory..."
rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR

echo "📁 Copying build output to deploy folder..."
cp -r dist/* $DEPLOY_DIR/
cp package.json $DEPLOY_DIR/
cp -r prisma $DEPLOY_DIR/
cp .env $DEPLOY_DIR/ 2>/dev/null || echo "⚠️ No .env file to copy"

cp -r node_modules $DEPLOY_DIR/
