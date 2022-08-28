import std/asynchttpserver
import std/asyncdispatch
import std/json
import std/strutils
import std/deques
import std/math
import std/times
import std/random
import std/strformat
import std/httpclient
import std/uri
import std/db_mysql
import std/algorithm
import puppy
import tables
import uri
import sequtils
import anycase

const ipfsNode = "139.180.130.150:5001"

proc ipfsRead*(arg: string): string =
  let website = fmt"http://{ipfsNode}/api/v0/cat?arg={arg}"
  let req = puppy.Request(
  url: parseUrl(website),
  verb: "post"
  )
  result = fetch(req).body

proc ipfsWrite*(data: string): string =
  var
    client = newHttpClient()
    multipartData = newMultipartData()
  multipartData["uploaded_file"] = ("data.json", "application/json", data)
  let res = client.request(&"http://{ipfsNode}/api/v0/add",
          httpMethod = HttpPost,
          multipart = multipartData)
  let jsonData = parseJson(res.body)
  result = jsonData["Hash"].getStr

proc asyncIpfsWrite*(data: string): Future[string] {.async.} =
  var
    client = newAsyncHttpClient()
    multipartData = newMultipartData()
  multipartData["uploaded_file"] = ("data.json", "application/json", data)
  let res = await client.request(&"http://{ipfsNode}/api/v0/add",
          httpMethod = HttpPost,
          multipart = multipartData)
  let jsonData = parseJson(await res.body)
  result = jsonData["Hash"].getStr