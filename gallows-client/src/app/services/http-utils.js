"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var login_service_1 = require('./session/login.service');
var HttpUtils = (function () {
    function HttpUtils(http, loginService) {
        this.http = http;
        this.loginService = loginService;
    }
    HttpUtils.prototype.get = function (url) {
        var user = this.loginService.getCurrentUser();
        var headers = new http_1.Headers();
        if (user)
            headers.append("Authorization", "Basic " + btoa(user.name + ":" + user.password));
        return this.http.get(url, { headers: headers })
            .toPromise()
            .catch(function (error) {
            console.log(error);
            if (error.status === 412)
                throw error._body;
            else
                throw "Error contacting Server!";
        });
    };
    HttpUtils.prototype.post = function (url, body) {
        var user = this.loginService.getCurrentUser();
        var headers = new http_1.Headers();
        if (user) {
            headers.append("Authorization", "Basic " + btoa(user.name + ":" + user.password));
            headers.append("Content-Type", "application/json");
        }
        return this.http.post(url, body, { headers: headers })
            .toPromise()
            .catch(function (error) {
            console.log(error);
            if (error.status === 412)
                throw error._body;
            else
                throw "Error contacting Server!";
        });
    };
    HttpUtils.prototype.uploadFile = function (url, file) {
        var user = this.loginService.getCurrentUser();
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            formData.append("file", file);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.setRequestHeader("Authorization", "Basic " + btoa(user.name + ":" + user.password));
            xhr.send(formData);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr);
                    }
                    else {
                        console.log(xhr.response);
                        if (xhr.status === 412) {
                            reject(xhr.response.responseText);
                        }
                        else {
                            reject("Error contacting Server!");
                        }
                    }
                }
            };
        });
    };
    HttpUtils = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, login_service_1.LoginService])
    ], HttpUtils);
    return HttpUtils;
}());
exports.HttpUtils = HttpUtils;
//# sourceMappingURL=http-utils.js.map