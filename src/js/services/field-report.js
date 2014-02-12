'use strict';

angular.module('reporter.services')
.factory('FieldReportService', function(storage) {
    var fieldReports = [], unsavedFieldReport;

    var emptyFieldReport = function() {
        return {
            id: new Date().valueOf().toString().substr(-12) + Math.random().toString(36).slice(13),
            createdAt: null,
            updatedAt: null,
            title: '',
            date: '2013-02-11',
            text: '',
            coords: {
                latitude: null,
                longitude: null
            },
            attachments: []
        };
    };

    if (storage.get('fieldReports') !== null) {
        fieldReports = storage.get('fieldReports');
    }

    if (storage.get('unsavedFieldReport') === null) {
        unsavedFieldReport = emptyFieldReport();
    } else {
        unsavedFieldReport = storage.get('unsavedFieldReport');
    }

    return {
        getFieldReport: function(id) {
            var obj = _.findWhere(fieldReports, {id: id});

            return obj || null;
        },

        getFieldReports: function() {
            return fieldReports;
        },

        getUnsavedFieldReport: function() {
            return unsavedFieldReport;
        },

        persistUnsavedFieldReport: function() {
            storage.set('unsavedFieldReport', unsavedFieldReport);

            return unsavedFieldReport;
        },

        resetUnsavedFieldReport: function() {
            unsavedFieldReport = emptyFieldReport();
            storage.set('unsavedFieldReport', null);

            return unsavedFieldReport;
        },

        createFieldReport: function() {
            unsavedFieldReport.createdAt = (new Date()).getTime();

            fieldReports.push(unsavedFieldReport);
            storage.set('fieldReports', fieldReports);

            // Reset
            this.resetUnsavedFieldReport();

            return true;
        },

        updateFieldReport: function(fieldReport) {
            fieldReport.updatedAt = (new Date()).getTime();

            angular.forEach(fieldReports, function(element, index, list) {
                if (element.id === fieldReport.id) {
                    list[index] = fieldReport;
                }
            });

            storage.set('fieldReports', fieldReports);

            return fieldReport;
        },

        deleteFieldReport: function(fieldReportId) {
            var newFieldReports = _.without(fieldReports, _.findWhere(fieldReports, {id: fieldReportId}));

            storage.set('fieldReports', newFieldReports);
            fieldReports = newFieldReports;

            return newFieldReports;
        }
    };
});
