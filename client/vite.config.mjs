{
  "name": "ems",
  "private": true,
  "workspaces": [
    "client",
    "shared"
  ],
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.1.1",
    "@radix-ui/react-collection": "^1.0.5",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dismissable-layer": "^1.0.6",
    "@radix-ui/react-focus-guards": "^1.0.6",
    "@radix-ui/react-focus-scope": "^1.1.0",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-portal": "^1.0.7",
    "@radix-ui/react-presence": "^1.0.8",
    "@radix-ui/react-progress": "^1.0.7",
    "@radix-ui/react-roving-focus": "^1.0.6",
    "@radix-ui/react-scroll-area": "^1.0.6",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.0.5",
    "@radix-ui/react-switch": "^1.0.7",
    "@radix-ui/react-tabs": "^1.0.7",
    "@radix-ui/react-toast": "^1.1.2",
    "@tanstack/react-query": "^5.28.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "lucide-react": "^0.525.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-dropzone": "^14.3.8",
    "react-hook-form": "^7.60.0",
    "react-router-dom": "^7.7.0",
    "tailwind-merge": "^3.3.1",
    "wouter": "^3.7.1",
    "zod": "^4.0.5"
  },
  "devDependencies": {
    "vite": "^7.0.5",
    "vite-tsconfig-paths": "^4.3.2"
  }
}
