angular
	.module('routes',["ui.router"])
	.config(function($stateProvider, $urlRouterProvider,$locationProvider){

		 $urlRouterProvider.otherwise('/');

		 $stateProvider
        .state('login', {
            url: '/',
            templateUrl: './views/login/login.html',
						controller:'logincntrl'
        })
				.state('hibi', {
						url: '/hibi',
						templateUrl: './views/hibi/hibi.html',
						controller:'hibicntrl'

				})
				.state('notice_data', {
						url: '/hibi/notice_data',
						templateUrl: './views/notice_data/notice_data.html',
						controller: 'notice_datacntrl'
				})
				.state('attendance', {
						url: '/attendance',
						templateUrl: './views/attendance/attendance.html',
						controller: 'attendancecntrl'
				})
				.state('grades', {
						url: '/grades',
						templateUrl: './views/grades/grades.html',
						controller:'gradescntrl'
				})
				.state('studentnoticeboard', {
						url: '/student_notice_board',
						templateUrl: './views/studentnoticeboard/studentnoticeboard.html',
						controller:'studentnoticeboardcntrl'

				})
				.state('404', {
						url: '/404',
						templateUrl: './views/404/404.html'

				})

				$locationProvider.html5Mode(false);

	})
