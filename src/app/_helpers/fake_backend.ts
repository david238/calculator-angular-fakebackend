import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // wrap in delayed observable to simulate server api call
        return of(null)
        .pipe(mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/api/calculate') && request.method === 'POST') {

              const number1 = parseFloat(request.body.one);
              const number2 = parseFloat(request.body.two);
              const mathfunc = request.body.mathfunc;
              let result = 0;

              if (mathfunc === 'x') {
                  result = number1 * number2;
              } else if (mathfunc === '-') {
                 result = number1 - number2;
              } else if (mathfunc === '+') {
                result = number1 + number2;
              } else if (mathfunc === '/') {
                if (number2 !== 0) {
                  result = number1 / number2;
                }
              }

              const body = {
                result: parseFloat(result.toString())
                .toFixed(8)
              };

              return of(new HttpResponse({ status: 200, body: body }));
            }

            // // get users
            // if (request.url.endsWith('/api/users') && request.method === 'GET') {
            //     // check for fake auth token in header and return users if valid,
            //     // this security is implemented server side in a real application
            //     if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            //         return of(new HttpResponse({ status: 200, body: users }));
            //     } else {
            //         // return 401 not authorised if token is null or invalid
            //         return throwError('Unauthorised');
            //     }
            // }

            // // get user by id
            // if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'GET') {
            //     // check for fake auth token in header and return user if valid,
            //     // this security is implemented server side in a real application
            //     if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            //         // find user by id in users array
            //         const urlParts = request.url.split('/');
            //         const id = parseInt(urlParts[urlParts.length - 1]);
            //         const matchedUsers = users.filter( user => return user.id === id; );
            //         const user = matchedUsers.length ? matchedUsers[0] : null;

            //         return of(new HttpResponse({ status: 200, body: user }));
            //     } else {
            //         // return 401 not authorised if token is null or invalid
            //         return throwError('Unauthorised');
            //     }
            // }

            // // create user
            // if (request.url.endsWith('/api/users') && request.method === 'POST') {
            //     // get new user object from post body
            //     let newUser = request.body;

            //     // validation
            //     let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
            //     if (duplicateUser) {
            //         return throwError('Username "' + newUser.username + '" is already taken');
            //     }

            //     // save new user
            //     newUser.id = users.length + 1;
            //     users.push(newUser);
            //     localStorage.setItem('users', JSON.stringify(users));

            //     // respond 200 OK
            //     return of(new HttpResponse({ status: 200 }));
            // }

            // // delete user
            // if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'DELETE') {
            //     // check for fake auth token in header and return user if valid,
            //     // this security is implemented server side in a real application
            //     if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            //         // find user by id in users array
            //         let urlParts = request.url.split('/');
            //         let id = parseInt(urlParts[urlParts.length - 1]);
            //         for (let i = 0; i < users.length; i++) {
            //             let user = users[i];
            //             if (user.id === id) {
            //                 // delete user
            //                 users.splice(i, 1);
            //                 localStorage.setItem('users', JSON.stringify(users));
            //                 break;
            //             }
            //         }

            //         // respond 200 OK
            //         return of(new HttpResponse({ status: 200 }));
            //     } else {
            //         // return 401 not authorised if token is null or invalid
            //         return throwError('Unauthorised');
            //     }
            // }

            // pass through any requests not handled above
            return next.handle(request);

        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown
        // (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
