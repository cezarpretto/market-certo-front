'use strict';

/**
 * @ngdoc overview
 * @name marketingCertoApp
 * @description
 * # marketingCertoApp
 *
 * Main module of the application.
 */
angular
  .module('marketingCertoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.utils.masks',
    'angular-loading-bar',
    'angular-growl',
    'smart-table',
    'naif.base64',
    'bgf.paginateAnything',
    'xeditable',
    'rt.select2',
    'ui.bootstrap',
    'mwl.confirm'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        controllerAs: 'users'
      })
      .when('/selectCompany', {
        templateUrl: 'views/selectcompany.html',
        controller: 'SelectcompanyCtrl',
        controllerAs: 'selectCompany'
      })
      .when('/companies', {
        templateUrl: 'views/companies.html',
        controller: 'CompaniesCtrl',
        controllerAs: 'companies'
      })
      .when('/campaigns', {
        templateUrl: 'views/campaigns.html',
        controller: 'CampaignsCtrl',
        controllerAs: 'campaigns'
      })
      .when('/campaign/:cpf/:tokenId?', {
        templateUrl: 'views/campaign.html',
        controller: 'CampaignCtrl',
        controllerAs: 'campaign'
      })
      .when('/products', {
        templateUrl: 'views/products.html',
        controller: 'ProductsCtrl',
        controllerAs: 'products'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'settings'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
