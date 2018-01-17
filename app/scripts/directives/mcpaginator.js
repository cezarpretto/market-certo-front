'use strict';

/**
 * @ngdoc directive
 * @name marketingCertoApp.directive:mcPaginator
 * @description
 * # mcPaginator
 */
angular.module('marketingCertoApp')
  .directive('mcPaginator', function ($rootScope) {
    return {
      templateUrl: 'views/mc-paginator-view.html',
      restrict: 'E',
      scope: {
        data: '=',
        searchTerm: '=',
        limit: '='
      },
      link: function postLink(scope, element, attrs) {
        // console.log(scope.limit);
        var pagination = {rows: 0, limit: 1, offset: 0};
        var searchTerm = undefined;
        scope.selected = 1;
        scope.pages = [];

        scope.$watch('data', function(newValue){
          if(newValue.data){
            if(newValue.data.length > 0){
              pagination.rows = newValue.rows;
              pagination.limit = scope.limit;
              pagination.offset = newValue.offset;
              calcPages(pagination, newValue.data.length);
            }
          }
        });

        scope.$watch('searchTerm', function(newValue){
          searchTerm = newValue;
        });

        function calcPages(pagination, length){
          scope.pages = [];
          var nrPages = Math.ceil(pagination.rows / pagination.limit);
          var offset = 0;
          for (var i = 0; i < nrPages; i++) {
            if(i === 0){
              var p = {pageNumber: i+1, offset: 0};
            }else{
              offset += pagination.limit;
              var p = {pageNumber: i+1, offset: offset};
            }
            scope.pages.push(p);
          }
        };

        scope.selectPage = function(page){
          scope.selected = page.pageNumber;
          page.searchTerm = searchTerm;
          page.limit = scope.limit;
          $rootScope.$broadcast('mc-page-change', page);
        };

        scope.next = function(){
          var position = scope.selected -1;
          var offset = scope.pages[position].offset + pagination.limit;
          var totalPages = scope.pages.length;
          var nextPage = scope.selected + 1;
          if(nextPage <= totalPages){
            scope.selected += 1;
            var page = {offset: offset};
            page.searchTerm = searchTerm;
            page.limit = scope.limit;
            $rootScope.$broadcast('mc-page-change', page);
          }
        };

        scope.previous = function(){
          var position = scope.selected -1;
          var offset = scope.pages[position].offset - pagination.limit;
          var totalPages = scope.pages.length;
          var previousPage = scope.selected - 1;
          if(previousPage >= 1){
            scope.selected -= 1;
            var page = {offset: offset};
            page.searchTerm = searchTerm;
            page.limit = scope.limit;
            $rootScope.$broadcast('mc-page-change', page);
          }
        };

        scope.begin = function(){
          if(scope.selected){

          }
        }
      }
    };
  });
