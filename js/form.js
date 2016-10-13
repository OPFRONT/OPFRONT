const CONTACT_FORM_EVENT = 'Contact form sent';

const getFormValuesObject = (formEl) => {
    const formValuesEls = formEl.querySelectorAll('input,textarea,select');
    let formValues = {};

    for (let formValueEl of formValuesEls) {
        formValues[formValueEl.name] = formValueEl.value;
    }

    return formValues
};

$('#subscribe-form').submit((e) => {
    $('#thanks').addClass('active');
    e.preventDefault();
});

document.getElementById('contact-us-form').addEventListener('submit', e => {
    const form = e.target;

    e.preventDefault();
    document.querySelector('#contact .thanks').classList.add('active');
    form.querySelector('.btn[type="submit"]').setAttribute('disabled', true);

    const formValues = getFormValuesObject(e.target);

    const message = `${formValues.firstname} ${formValues.lastname} (${formValues.email}) asks for contact on website.\n message: ${formValues.message}`;
    sendMessageToSlack(message);
    analytics.track(CONTACT_FORM_EVENT, formValues);
});

for (let formEl of document.querySelectorAll('input,textarea,select')) {
    formEl.addEventListener('blur', _ => {
        if (formEl.value) formEl.classList.add('filled');
        else formEl.classList.remove('filled')
    });
}