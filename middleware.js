import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/forum(.*)',
]);

export default clerkMiddleware(async (auth, req) => {

    if (isProtectedRoute(req)) {
        // If user is authenticated, redirect to /dashboard
        if (auth.user) {
            // console.log("User is authenticated, redirecting to /dashboard");
            return Response.redirect('/dashboard');
        }

        // Protect the route if the user is not authenticated
        // console.log("User not authenticated, protecting route");
        await auth.protect();
    }
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
