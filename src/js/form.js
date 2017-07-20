const CONTACT_FORM_EVENT = 'Contact form sent';
const SUBSCRIBE_FORM_EVENT = 'Subscribe form sent';

const inputs = document.querySelectorAll('input,textarea,select');
for(let i = 0; i< inputs.length; i++) {
    const formEl = inputs[i];
    formEl.addEventListener('blur', _ => {
        if (formEl.value) formEl.classList.add('filled');
        else formEl.classList.remove('filled')
    });
}

const _getFormValuesObject = (formEl) => {
    const formValuesEls = formEl.querySelectorAll('input,textarea,select');

    let formValues = {};
    for(let i = 0; i < formValuesEls.length; i++) {
        const formValueEl = formValuesEls[i];
        formValues[formValueEl.name] = formValueEl.value;
        formValueEl.value = "";
    }

    return formValues
};

const _addUserAsLead = (userInfo) => {
    const identifyPayload = {
        firstName: userInfo.firstname,
        lastName: userInfo.lastname,
        email: userInfo.email,
        phone: userInfo.phone,
        createdAt: (new Date()).toISOString(),
        company: {
            name: userInfo.company,
            website: userInfo.website
        },
        website: userInfo.website
    };
    console.log(identifyPayload);

    //TODO find a better way to add leads, seems like its not working with freshsales
    // analytics.identify(userInfo.email, identifyPayload)
};

//CONTACT
if(document.getElementById('contact-us-form')) {
    document.getElementById('contact-us-form').addEventListener('submit', e => {
      const form = e.target;

      e.preventDefault();
      document.querySelector('#contact .thanks').classList.add('active');
      form.querySelector('.btn[type="submit"]').setAttribute('disabled', true);

      const formValues = _getFormValuesObject(e.target);

      const message = `${formValues.firstname} ${formValues.lastname} (${formValues.email}) asks for contact on website.\n message: ${formValues.message}`;
      sendMessageToSlack(message);
      analytics.track(CONTACT_FORM_EVENT, formValues);
    });
  };

//SUBSCRIBE
if(document.getElementById('subscribe-form')) {
  document.getElementById('subscribe-form').addEventListener('submit', e => {
    const form = e.target;

    e.preventDefault();
    const formValues = _getFormValuesObject(form);
    analytics.track(SUBSCRIBE_FORM_EVENT, formValues);
    _addUserAsLead(formValues);

    let message = `${formValues.firstname} ${formValues.lastname} (${formValues.email}) just subscribed.`;
    for (let key in formValues) message += `\n ${key} : ${formValues[key]}`

    sendMessageToSlack(message);
    document.getElementById('thanks').classList.add('active');
  });
};
