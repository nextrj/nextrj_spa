// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { getAvailablePort, parseArgs } from './deps.ts'

// start params
const args = parseArgs(Deno.args, { default: { 'p': getAvailablePort() } })

// start server with abort controller
const ac = new AbortController()
Deno.serve({
  port: args.p,
  // hostname: '0.0.0.0',
  onListen({ port, hostname }) {
    console.warn(`Server started at http://${hostname}:${port}`)
  },
  signal: ac.signal,
  handler: (_req) => new Response('Hello, world'),
}).finished.then(() => console.warn('Server closed'))

// listen OS Signals to close the serve
// https://deno.land/manual@v1.36.4/examples/os_signals
Deno.addSignalListener('SIGINT', () => {
  console.warn('Closing server...')
  // release resources

  // stop server
  ac.abort()
})
