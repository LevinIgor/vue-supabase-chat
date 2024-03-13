# Full-stack real-time chat

- Data: PostgeSQL managed by Supabase @supabase_io (awesome real-time API).
- Front-end: Vue.js + Vite
- UI library: Tailwind
- Hosting: Vercel
- Country flags from vue-country-flag-next

## Install
**npm install** to setup dependencies

## Supabase
Create Supabase project https://supabase.com/dashboard/projects
URL and KEY take from Project -> "Project Settings" ->> "API"


![image](https://cincccptobelmodposou.supabase.co/storage/v1/object/public/service/hkhkjhkj.jpg)


## Supabase variables
Create a .env or .env.local (git not init this file) file with
- VITE_SUPABASE_URL 
- VITE_SUPABASE_KEY

If you use VITE, Use only VITE_*** prefix !


![image](https://cincccptobelmodposou.supabase.co/storage/v1/object/public/service/Screenshot%202024-03-13%20192130.png)


## Setup your Supabase project
The following database table is required:

![image](https://cincccptobelmodposou.supabase.co/storage/v1/object/public/service/Screenshot%202024-03-13%20191338.png)


### Turn on realtime mode on message table:


![image](https://cincccptobelmodposou.supabase.co/storage/v1/object/public/service/Screenshot%202024-03-13%20192913.png)


### Create two policy:
- All users can insert in table
- All users can read from table


![image](https://cincccptobelmodposou.supabase.co/storage/v1/object/public/service/Screenshot%202024-03-13%20193101.png)
![image](https://cincccptobelmodposou.supabase.co/storage/v1/object/public/service/Screenshot%202024-03-13%20193341.png)


### Create two function:
- get_country_count
- get_counts

``` sql
create or replace function get_country_count ()
  returns table (country text, name text, record_count bigint) as $$
BEGIN
  RETURN QUERY
select
  location -> 'country' ->> 'iso_code' as country,
  location -> 'country' ->> 'name' as name,
  count(*) as record_count
from
  users
group by
  country, name;
END;
$$ language plpgsql;
```

``` sql
create or replace function get_counts ()
  returns table (viewers bigint, message_count bigint) as $$
BEGIN
  RETURN QUERY
SELECT
  COUNT(DISTINCT location->>'ip') AS viewers, COUNT(*) AS message_count
FROM public.message;
END;
$$ language plpgsql;
```

![image](https://cincccptobelmodposou.supabase.co/storage/v1/object/public/service/Screenshot%202024-03-13%20194208.png)
## Follow instruction here

### Dev
**npm run dev** to run server on port 3000

### Build
**npm run build** to build the react client

### Demo
**https://vue-chat-lovat.vercel.app/**

![image](https://cincccptobelmodposou.supabase.co/storage/v1/object/public/service/Screenshot%202024-03-13%20192655.png)
