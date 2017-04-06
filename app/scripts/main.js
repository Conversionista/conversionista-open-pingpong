$(document).ready(function($) {
    'use strict';
    WebFont.load({
        google: {
            families: ['Coming Soon']
        }
    });
});

$('#btn').on('click', function(event) {
    'use strict';
    event.preventDefault();
    /* Act on the event */
    authorize(event);
    // $('#reg').addClass('is-active');
});

$('#reg button.delete').on('click', function(event) {
    'use strict';
    event.preventDefault();
    /* Act on the event */
    $('#reg').removeClass('is-active');
});

var clientId = '103212263499-8acgob9gddeccbictgmdv94lapio18d2.apps.googleusercontent.com',
    scopes = ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/plus.profile.emails.read'];

var field = {
    fullName: $('input[name="entry.179769443"]'),
    email: $('input[name="entry.1643645516"]'),
    phone: $('input[name="entry.1603266961"]')
};

/**
 * Response callback for when the API client receives a response.
 *
 * @param resp The API response object with the user email and profile information.
 */
function handleEmailResponse(resp) {
    'use strict';
    console.log(resp);
    if (!resp.error) {
        var primaryEmail;
        if (resp.emails) {
            for (var i = 0; i < resp.emails.length; i++) {
                if (resp.emails[i].type === 'account') {
                    primaryEmail = resp.emails[i].value;
                }
            }

            field.email.val(primaryEmail);

        }

        if (resp.displayName) {
            field.fullName.val(resp.displayName);
        }

        $('#reg').addClass('is-active');
        field.phone.focus();

    }
}


/**
 * Sets up an API call after the Google API client loads.
 */
function apiClientLoaded() {
    'use strict';
    gapi.client.plus.people.get({ userId: 'me' }).execute(handleEmailResponse);
}

function authorize(event) {
    'use strict';
    // Handles the authorization flow.
    // `immediate` should be false when invoked from the button click.
    // addProgress(0.13);
    var useImmdiate = event ? false : true;

    /*eslint-disable camelcase*/
    var authData = {
        client_id: clientId,
        scope: scopes,
        immediate: useImmdiate
    };
    /*eslint-enable camelcase*/

    gapi.auth.authorize(authData, function(response) {

        if (response.error) {
            console.info(response.error);
        } else {
            console.log(response);
            gapi.client.load('plus', 'v1', apiClientLoaded);

        }
    });
}

$('#ss-submit').on('click', function(event) {
    'use strict';
    //event.preventDefault();
    /* Act on the event */

    $.each(field, function(index, val) {
        $(this).parent().find('span.help').remove();
        if (val.val() === '') {
            console.log('empty');
            $(this).removeClass('is-success').addClass('is-danger');
            $(this).parent().append('<span class="help is-danger">Sorry, this field can\'t be empty</span>');

        } else if (val.val() !== '') {
            $(this).removeClass('is-danger').addClass('is-success');
        }
    });

    if (field.fullName.val() !== '' && field.email.val() !== '' && field.phone.val() !== '') {
        var btn = $(this);

        btn.removeClass('is-primary').addClass('is-disabled is-loading is-info');

        $('#secret-frame').on('load', function () {
            console.info('Form posted to Google Forms...');
            btn.removeClass('is-info').addClass('animated infinite pulse is-success');

            setTimeout(function() {
                // replace the url in quotes below to where you want to the user to be redirected to
                window.location = document.location.href + '/registered.html';
            }, 1000);
        })
        
    }

});;

$('input').keypress(function(event) {
    'use strict';
    if (event.which == 13) {
        event.preventDefault();
        $('#ss-submit').click();
    }
});

(function() {
    // Initialize
    var bLazy = new Blazy();
})();
