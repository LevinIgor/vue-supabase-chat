# Full-stack real-time chat

- Data: PostgeSQL managed by Supabase @supabase_io (awsome real-time API).
- Front-end: Vue.js + Vite
- UI library: Tailwind
- Hosting: Vercel
- Country flags from vue-country-flag-next

## Install
**npm install** to setup dependencies

## Supabase variables
Create a .env file with
- VITE_SUPABASE_URL 
- VITE_SUPABASE_KEY

## Setup your Supabase project
The following database table is required:

| Field      	| Type      	|
|------------	|-----------	|
| id         	| BIGINT    	|
| author     	| TEXT      	|
| text       	| TEXT      	|
| country    	| TEXT      	|
| created_at 	| timestamp 	|

## Follow instrunction here

### Dev
**npm run dev** to run server on port 3000

### Build
**npm run build** to build the react client

### Demo
**https://vue-chat-lovat.vercel.app/**
