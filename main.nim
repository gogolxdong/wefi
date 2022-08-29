import jester
import re
import jester, os, re, strutils, strformat,json, db_mysql,times,logging, sequtils,random
import ipfsHttpClient

settings:
    port = Port(8082)
    staticDir = getCurrentDir() / "build"

const cid = {"ios":"","android":""}.toTable    
routes:
    get re"/(.*)":
        cond request.matches[0].splitFile.ext == ""
        resp(Http200, {"Content-Type":"text/html"}, readFile("build/index.html"))
    get "/download/@name":
        var name = @"name"
        echo name
        var content = readFile(&"download/{name}")
        echo content.len
        var headers = {"Content-Description":"File Transfer",
        "Content-Type":"application/octet-stream",
        "Content-Disposition": &"attachment; filename={name}",
        "Expires":"0",
        "Cache-Control":"must-revalidate, post-check=0, pre-check=0",
        "Pragma":"public",
        "Content-Length": $content.len,
        "Content-Transfer-Encoding":"binary"
        }
        resp(Http200, headers, content)

        

