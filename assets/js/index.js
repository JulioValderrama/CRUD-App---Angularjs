// Create angular myApp

angular.module('myApp', ['ngResource'])

angular.module("myApp")

    .config(['$resourceProvider', function($resourceProvider){
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }])

    .controller("homeController", ["$scope", "$resource", "$http", function($scope, $resource, $http) {

        $scope.angularusers = window.angularusers;
        $scope.userId = window.userId;
        $scope.angularClick;
        $scope.getUsers;
        $scope.getUser;

        $scope.userId;
        $scope.userName;
        $scope.userEmail;
        $scope.userGender;
        $scope.userStatus;
        
        $scope.clickGetUsers = function() {

            $http.get("http://localhost:5500/api/users")
                .then(response => {
                $scope.getUsers = response.data;
                console.log("REQUEST SENT")
                console.log(response.data)
                })
                .catch(response => {
                $scope.content = "Something went WRONG!";
                })
        }

        $scope.clickGetUser = function(index) {

            id = angularusers[index]._id;

            $http.get(`http://localhost:5500/api/users?id=${id}`)
                .then(response => {
                    $scope.getUser = response.data;
                    console.log("REQUEST SENT")
                    console.log(response.data)
                })
                .catch(response => {
                    $scope.content = "Something went WRONG!";
                })
        }

        $scope.getDetails = (index) => {
            
            $scope.index = index + 1;
            $scope.angularClick = $scope.angularusers[index]
        }

        $scope.saveUser = function() {

            var updateUser = JSON.stringify({
                name: $scope.userName,
                email: $scope.userEmail,
                gender: $scope.userGender,
                status: $scope.userStatus
            })

            var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }

            $http.post(`http://localhost:5500/api/users/${$scope.userId}`, updateUser, config)
            .then(function (data) {
                alert(`The data is: ${data} and the updateUser is: ${updateUser}`);
            })
            .catch(function (data) {
                alert(data.Message);
            });

            
        }



    }])

/*
{
                method: "POST",
                url: `http://localhost:5500/api/users/${$scope.userId}`,
                dataType: 'json',
                data: updateUser,
                headers: { "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8;' }
            }
*/

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





// A DIFFERENT WAY OF SENDING REQUEST WITH $RESOURCE SERVICE


// $scope.getUser = function() {

//     var getUser = $resource("/api/users?id=:id", {
//         id: "@id"
//     }, {
//         "typeReq": {
//             method: "get",
//             isArray: false
//         }
//     })
//     .typeReq({
//         id: "62a0036616a073a00adb26e5"
//     })
//     .$promise
//     .then(function(result) {
//         if (result) {
//             $scope.getCarSucceeded = true;
//             $scope.getCarResponse = JSON.stringify(result, null, 3);
//          } else {
//             $scope.getCarFailed = true;
//             $scope.getCarErrorMsg = "Error occurred.";                  
//          }
//         }, function(error) {
//          $scope.getCarFailed = true;
//          $scope.getCarErrorMsg = "Error occurred.";
//     });
// }