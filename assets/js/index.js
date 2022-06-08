// Create angular myApp

angular.module('myApp', ['ngResource'])

angular.module("myApp")

    .config(['$resourceProvider', function($resourceProvider){
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }])

    .controller("homeController", ["$scope", "$resource", function($scope, $resource) {

        $scope.angularusers = window.angularusers;
        $scope.angularClick;
        $scope.getCarResponse;

        $scope.getUser = function() {

            var getUser = $resource("/api/users?id=:id", {
                id: "@id"
            }, {
                "typeReq": {
                    method: "get",
                    isArray: false
                }
            })
            .typeReq({
                id: "62a0036616a073a00adb26e5"
            })
            .$promise
            .then(function(result) {
                if (result) {
                    $scope.getCarSucceeded = true;
                    $scope.getCarResponse = JSON.stringify(result, null, 3);
                 } else {
                    $scope.getCarFailed = true;
                    $scope.getCarErrorMsg = "Error occurred.";                  
                 }
                }, function(error) {
                 $scope.getCarFailed = true;
                 $scope.getCarErrorMsg = "Error occurred.";
            });
        }

        $scope.getDetails = (index) => {
            
            $scope.index = index + 1;
            $scope.angularClick = $scope.angularusers[index]
        }






    }])



// To send a DELETE Request from the <a> delet ebottom in _show.ejs 

if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function() {

        var id = $(this).attr("data-id")

        var request = {
            "url": `http://localhost:5500/api/users/${id}`,
            "method": "DELETE"
        }

        if (confirm("Do you really want to delete this User?")) {
            $.ajax(request).done(response => {
                alert("Data DELETED successfully!")
                location.reload();
            })
        }

    })
}

