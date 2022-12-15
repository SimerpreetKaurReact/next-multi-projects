SPA working with tokens instead of sessions
1.Pages are served directly and populated with logic without hitting the server 2. Backend Api work in a stateless way(they dont care about the connected clients), servers dont save information about authenticated clients
Instead, clients should get information that allows them to prove their authentication

# Server side Page

1. Automatic page pre-rendering: Great for SEO and initial load
2. Blending client side and server side: Fetch data on the server and render finished pages

# File based Routing

1. Define pages and routes in files and folders, where next infers routes based on the page structure, so less code, easily understandable

eg: route is ip/blog/2020/12
and we create [..slug] file in ip folder, so
[...slug] for route which catches all / seperated values in an array so ["2020","12"]
<a> these tag fetch a seperate load with a brand new request
Link tags from next, works without sending http request
Link can be set with href with pathname and query property
eg: Link href={{pathname:"clients/[id]",query:{id:client.id}}}
Link href={`clients/[${client.id}]`}
For navigating programatically
router.push() or router.replace()
with replace we cannot go back

# Build full stack react apps

1. Easily add backend code to next apps
2. Storing data, getting data authentication etx can be added to your React apps
