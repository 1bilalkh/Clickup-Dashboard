[1mdiff --git a/vercel.json b/vercel.json[m
[1mindex 2feed44..1900f32 100644[m
[1m--- a/vercel.json[m
[1m+++ b/vercel.json[m
[36m@@ -1,8 +1,29 @@[m
 {[m
[31m-  "rewrites": [[m
[32m+[m[32m  "version": 2,[m
[32m+[m[32m  "builds": [[m
     {[m
[31m-      "source": "/((?!api/|assets/).*)",[m
[31m-      "destination": "/index.html"[m
[32m+[m[32m      "src": "api/index.js",[m
[32m+[m[32m      "use": "@vercel/node"[m
[32m+[m[32m    },[m
[32m+[m[32m    {[m
[32m+[m[32m      "src": "package.json",[m
[32m+[m[32m      "use": "@vercel/static-build",[m
[32m+[m[32m      "config": {[m
[32m+[m[32m        "distDir": "dist"[m
[32m+[m[32m      }[m
[32m+[m[32m    }[m
[32m+[m[32m  ],[m
[32m+[m[32m  "routes": [[m
[32m+[m[32m    {[m
[32m+[m[32m      "src": "/api/(.*)",[m
[32m+[m[32m      "dest": "api/index.js"[m
[32m+[m[32m    },[m
[32m+[m[32m    {[m
[32m+[m[32m      "handle": "filesystem"[m
[32m+[m[32m    },[m
[32m+[m[32m    {[m
[32m+[m[32m      "src": "/(.*)",[m
[32m+[m[32m      "dest": "/index.html"[m
     }[m
   ][m
 }[m
\ No newline at end of file[m
