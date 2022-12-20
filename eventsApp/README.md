SPA working with tokens instead of sessions

1. Pages are served directly and populated with logic without hitting the server
2. Backend Api work in a stateless way(they dont care about the connected clients), servers dont save information about authenticated clients
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
2. Storing data, getting data authentication etc can be added to your React apps

# Two forms of prerendering

1. Static Generation: All pages are pre genrated (with data prepared on the server-side) in advanced during build time
2. Server-side Rendering

# Static Generation

Pages are prepared ahead of time and can be cached by the server serving the app

a) getStaticProps: inside the page components

async function getStaticProps(context){

}
code in get static props is never visible at client side, so credentials can be added here
Incremental Static Generation: revalidate time can be added
for every request it should be regenerated unless revalidate time
getStaticProps runs before the component function runs, later component function runs to prerender the page. At server side there is no routes so context.params provides all the dyanamic routes id for the page like [clientId], which you need to display that specific client's data

- getStaticPaths

  Dynamic pages[id].js etc, dont just need data: You also need to know which id values wiil be available
  Multiplt concrete[id] page instances eg id =1, id=2 are pre-generated

  async function getStaticPaths(){
  set fallback to false when all such pages are pregenrated
  pregenerating rarely visited pages is waste of resources, so you can use fallback in get static paths, setting fallback to true , makes sure that page not listed in path are pregenerated in just in time when page is loaded.
  fallback allows us to pregenerate the highly visited pages and postpone the generation of the less frequented pages to the server. This dynamic pregeneration is not completed instantely, so you need to add a fallback loop in the component when this data from props is still loading
  Setting fallback to blocking, next js will wait for this page to be fully pregenrate on the server before it serves that.`

- if we dont have the client Id set in params, By setting notfound true, we are able to use fallback true and try to find a client for a parameter value
  which was not predefined here because dummy-backend.json is a more dynamic data source
  which could yield that client. But if we then still fail to fetch it we don't want to return to regular page with the missing data, which causes an error.
  But we then wanna show the not found the 404 error page instead.
- revalidate is as per new request, if a new request comes in and it has been more than 30 sec since the page was last generated. it will regenerate again.

# Server side Rendering

Sometimes, you need to pre-render for every request Or you need access to the request object(eg: for the cookies)
next js allows you to run real server side code as well
export async function getServerSideProps(){

}

- page is generated on the server after deployment on each request(giving access to request and response object)
- this request is only added in the page component file and next js is going to run it whenever a request for this page is made
  you should use either of get static props or get server side props
  eg: user profile path, you need to acces the cookies to show that particular authenticated user's info
- wont need any get static paths, because we run the code for getServerside props for every request
- lamda symbol while creating the build shows which files were not pregenerated

# Client side data fetching

- Data changing with high frequency
- Highly user specific data
- Partial data like data thats only used on a part of an page
- pre rendering data will add data before page is loaded, so on first user does not see an empty page, and after that on client data is simply fetched again for normal client side ui experience

# Head tag from next

- supports dynamic head content
- meta tags are also available in page source, so its userful for search optimization
- if some head tag you want to add to all pages you should use \_app file, since it is rendered for every page
- contents of different head sections get merged
- if you same element like title in two head tags for same component, next will resolve such conflicts and use the latest on will win
- page specific data in specific page file will be given priority of more general head data in \_app file, because the page component is rendered after the app component

# \_app.js

- it is the application shell/ root component inside the body section of the html document

# \_document.js

- allows to customize the entire html document

# IMAGE

Next.js will create multiple versions of our image on the fly when requests are coming in,
optimize for the operating systems and device sizes that are making the request.
And then those generated images will be cached for future requests from similar devices.

# Backend

some data storage tasks like accept user feedback submission, newsletter signup etc can be done from within next js app. These api's in api folder within pages is not visible at client side
usin getStaticProps with backend api on the same server, its better to fetch data directly from backend instead of adding a seperate fetch request
if there is a more specific page for a given path value, next will match with that
catch all routes work with next
