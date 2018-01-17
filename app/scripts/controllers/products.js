'use strict';

/**
 * @ngdoc function
 * @name marketingCertoApp.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the marketingCertoApp
 */
angular.module('marketingCertoApp')
  .controller('ProductsCtrl', ['$scope', 'AuthService', 'growl', 'ProductService', 'ProductModel', 'SizeModel', 'ModalService', '$q', function($scope, authService, growl, productService, productModel, sizeModel, modalService, $q) {
    authService.isLoggedIn();
    var selectedCompany = authService.selectedCompany;
    $scope.products = [];
    $scope.productsAux = $scope.products;
    $scope.search = new productModel.Search();
    $scope.search.empresa.id = selectedCompany.id;
    $scope.product = new productModel.Product();
    $scope.base64Logo = undefined;
    $scope.isLoading = false;
    $scope.isMestre = false;

    $scope.productsSimilar = [];
    $scope.productsSimilarAux = $scope.productsSimilar;

    $scope.productsMestre = [];
    $scope.productsMestreAux = $scope.productsMestre;

    $scope.groups = [];
    $scope.groupsAux = $scope.groups;
    $scope.subGroups = [];
    $scope.subGroupsAux = $scope.subGroups;
    $scope.typeDialog = 0;
    $scope.isEditing = false;
    $scope.rowProd = 0;
    $scope.types = [{
      'name': 'Mestre',
      'id': '1'
    }, {
      'name': 'Similar',
      'id': '2'
    }];

    $scope.sizes = [];
    $scope.sizesAux = $scope.sizes;
    $scope.quantitySizes = [];
    $scope.quantitySizesAux = $scope.quantitySizes;
    $scope.backupProduct = new productModel.Product();
    $scope.size = new sizeModel.Size();

    var load = false;

    $scope.submitSearch = function() {
      load = true;
      $scope.callServer({
        'pagination': {},
        'sort': {}
      });
    };

    $scope.clickImg = function() {
      setTimeout(function() {
        document.getElementById('inputFile').click()
      }, 0);
    };

    $scope.callServer = function(tableState) {
      if (load) {
        $scope.isLoading = true;
        var pagination = tableState.pagination;
        var search = tableState.search;
        var sort = tableState.sort;
        var start = pagination.start || 0; // This is NOT the page number, but the index of item in the list that you want to use to display the table.
        var number = pagination.number || 10; // Number of entries showed per page.
        if ($scope.search.nome === 1) {
          $scope.search.mestre = true;
        } else {
          $scope.search.mestre = false;
        }
        $scope.search.offset = start;
        $scope.search.limit = pagination.number;
        $scope.search.typeOrder = sort.reverse ? 'DESC' : 'ASC';
        $scope.search.fieldOrder = sort.predicate || 'codigo';
        console.log($scope.search);
        productService.getProducts($scope.search).then(function(data) {
          $scope.products = data.data.data;
          console.log($scope.products);
          tableState.pagination.numberOfPages = $scope.products.length > 0 ? Math.ceil($scope.products[0].rows / number) : 0;
          $scope.isLoading = false;
          if (data.data.data.length === 0) {
            growl.info('A pesquisa não retornou nenhum produto!', {
              ttl: 3000
            });
          }
        }).catch(function(err) {
          console.error(err);
          $scope.isLoading = false;
          growl.error('Não foi possível realizar a pesquisa! </br> ' + err.data.message);
        });
      }
    };

    $scope.$watch('base64Logo', function(newValue) {
      console.log(newValue);
      if (newValue !== undefined) {
        $scope.product.foto = 'data:' + newValue.filetype + ';base64,' + newValue.base64;
        $scope.changeStatus();
      }
    });

    $scope.moreInformation = function(p, type) {
      $scope.backupProduct = angular.copy(p);
      $scope.product = p;
      $scope.isEditing = false;
      if (type === undefined || type === 1) {
        $scope.typeDialog = 1;
      } else {
        $scope.typeDialog = 2;
      }
      $scope.quantitySizesAux = p.tamanhos;
      $scope.quantitySizes = $scope.quantitySizesAux;
      $scope.base64Logo = undefined;
      var f = new productModel.Search();
      f.mestre = null;
      f.grupo = {
        'id': p.idMestre
      };
      productService.getProducts(f).then(function(data) {
        var idx = data.data.data.map(function(e) {
            return e.id;
        }).indexOf(p.id);
        if (idx !== -1) {
          data.data.data.splice(idx, 1);
        }
        $scope.productsSimilar = data.data.data;
        $scope.productsSimilarAux = $scope.productsSimilar;
      }).catch(function(err) {
        console.error(err);
        growl.error('Não foi possível realizar a busca por produtos similares! </br> ' + err.data.message);
      });
      retrieveListProductMestre();
      modalService.show('dlgInfoProd');
    };

    $scope.changeStatus = function() {
      if ($scope.typeDialog !== 0) {
        console.log('editando...');
        $scope.isEditing = true;

      } else {
        console.log('criando...');
        $scope.isEditing = false;
      }
    };

    $scope.newProduct = function(isSimilar) {
      $scope.typeDialog = 0;
      $scope.isEditing = false;
      if (isSimilar) {
        var pAux = angular.copy($scope.product);
      }
      $scope.product = new productModel.Product();
      $scope.quantitySizesAux = [];
      $scope.quantitySizes = $scope.quantitySizesAux;
      if (isSimilar) {
        $scope.product.idMestre = pAux.id;
        $scope.product.grupo = pAux.grupo;
        $scope.product.obs = pAux.obs;
        $scope.product.mestre = false;
      }
      $scope.base64Logo = undefined;
      retrieveListProductMestre();
      modalService.show('dlgInfoProd');
    };

    var retrieveListProductMestre = function() {
      var f = new productModel.Search();
      f.mestre = true;
      productService.getProducts(f).then(function(data) {
        $scope.productsMestre = data.data.data;
        $scope.productsMestreAux = $scope.productsMestre;
      }).catch(function(err) {
        console.error(err);
        growl.error('Não foi possível realizar a busca por produto master! </br> ' + err.data.message);
      });
    };

    var listGroups = function() {
      productService.getGroups().then(function(data) {
        $scope.groups = data.data;
        $scope.groupsAux = $scope.groups;
      }).catch(function(err) {
        console.error(err);
        growl.error('Não foi possível realizar a busca de grupos! </br> ' + err.data.message);
      });
    };

    var listSubGroups = function() {
      productService.getSubGroups().then(function(data) {
        $scope.subGroups = data.data;
        $scope.subGroupsAux = $scope.subGroups;
      }).catch(function(err) {
        console.error(err);
        growl.error('Não foi possível realizar a busca de subgrupos! </br> ' + err.data.message);
      });
    };
    listGroups();
    listSubGroups();

    $scope.getSizes = function() {
      productService.getSizes(selectedCompany.id).then(function(data) {
        $scope.sizes = data.data;
        $scope.sizesAux = $scope.sizes;
      }).catch(function(err) {
        console.error(err);
        growl.error('Não foi possível realizar a busca de tamanhos! </br> ' + err.data.message);
        $scope.sizes = [];
        $scope.sizesAux = $scope.sizes;
      });
    };

    $scope.changeSizes = function(size) {
      if($scope.size.operacao !== 1) {
        $scope.changeStatus();
        var index = $scope.product.tamanhos.map(function(e) {
            return e.descricao;
        }).indexOf(size.descricao);
        if (index === -1) {
          size.quantidade = 0;
          $scope.quantitySizesAux.push(size);
          $scope.quantitySizes = $scope.quantitySizesAux;
        } else {
          $scope.quantitySizesAux.splice(index, 1);
          $scope.quantitySizes = $scope.quantitySizesAux;
        }
        $scope.product.tamanhos = $scope.quantitySizesAux;
      }
    };

    $scope.containSizeInProduct = function(size) {
      var ret = false;
      var index = $scope.product.tamanhos.map(function(e) {
          return e.descricao;
      }).indexOf(size.descricao);
      if (index !== -1) {
        ret = true;
      }
      return ret;
    };

    $scope.closeModal = function() {
      modalService.hide('dlgInfoProd');
      if ($scope.isEditing) {
        var idx = $scope.products.map(function(e) {
            return e.id;
        }).indexOf($scope.product.id);
        if (idx !== -1) {
          $scope.products.splice(idx, 1);
          $scope.products.push($scope.backupProduct);
        }
      }
      $scope.product = new productModel.Product();
      $scope.backupProduct = new productModel.Product();
      $scope.isEditing = false;
      $scope.typeDialog = 0;
      $scope.rowProd = 0;
      $scope.base64Logo = undefined;
    };

    $scope.save = function() {
      if ($scope.isEditing) {
        if ($scope.product.tamanhos.length < 1) {
          growl.error('Atenção, você deve inserir ao menos um tamanho/quantidade!', {
            ttl: 5000
          });
        } else {
          productService.updateProduct($scope.product).then(function(data) {
            $scope.callServer({
              'pagination': {},
              'sort': {}
            });
            modalService.hide('dlgInfoProd');
            growl.success('Produto alterado com sucesso!', {
              ttl: 4000
            });
          }).catch(function(err) {
            growl.error('Não foi possível alterar o produto. Contate o suporte.');
            console.error(err);
          });
        }
      } else {
        if ($scope.product.tamanhos.length < 1) {
          growl.error('Atenção, você deve inserir ao menos um tamanho/quantidade!', {
            ttl: 5000
          });
        } else {
          productService.insertProduct($scope.product).then(function(data) {
            $scope.callServer({
              'pagination': {},
              'sort': {}
            });
            modalService.hide('dlgInfoProd');
            growl.success('Produto cadastrado com sucesso!', {
              ttl: 4000
            });
          }).catch(function(err) {
            growl.error('Não foi possível cadastrar o produto. Contate o suporte.');
            console.error(err);
          });
        }
      }
    };

    $scope.newSize = function() {
      $scope.size = new sizeModel.Size();
      $scope.size.id = selectedCompany.id;
      $scope.size.operacao = 1;
      $scope.sizes.push($scope.size);
      // $scope.sizes = $scope.sizesAux;
    };

    $scope.revertSize = function() {
      var idx = $scope.sizes.map(function(e) {
          return e.descricao;
      }).indexOf($scope.size.descricao);
      if(idx !== -1) {
        $scope.sizes.splice(idx, 1);
        // $scope.sizes = $scope.sizesAux;
      }
      $scope.size = new sizeModel.Size();
    };

    $scope.saveSize = function() {
      if($scope.size.descricao !== undefined) {
        if (window.confirm('Deseja realmente salvar o tamanho ' + $scope.size.descricao + '?')) {
          productService.insertSize($scope.size).then(function(data) {
            $scope.getSizes();
            $scope.size = new sizeModel.Size();
            growl.success('Tamanho cadastrado com sucesso!', {
              ttl: 4000
            });
          }).catch(function(err) {
            growl.error('Não foi possível cadastrar o tamanho. Contate o suporte.');
            console.error(err);
          });
        }
      } else {
        growl.warning('Atenção, você não atribuiu uma descrição para o tamanho!', {
          ttl: 4000
        });
      }
    };
  }]);
