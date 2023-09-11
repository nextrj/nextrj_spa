// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.

/**
 * The Web Server.
 *
 * @module
 */

const ac = new AbortController()

// start server
const server = Deno.serve({
  port: 8001,
  // hostname: '0.0.0.0',
  onListen({ port, hostname }) {
    console.warn(`Server started at http://${hostname}:${port}`)
  },
  signal: ac.signal,
  handler: (_req) => new Response('Hello, world'),
})

// Handle OS Signals
// https://deno.land/manual@v1.36.4/examples/os_signals
Deno.addSignalListener('SIGINT', () => {
  console.warn('Closing server...')
  // release resources

  // stop server
  ac.abort()
})

// warn server closed
server.finished.then(() => console.warn('Server closed'))
