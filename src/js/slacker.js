const SLACK_SUPPORT_WEBHOOK_URL = 'https://hooks.slack.com/services/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';

const sendMessageToSlack = (text) => {
  let jsonSlackPayload = JSON.stringify({text});
  let xhr = new XMLHttpRequest();

  xhr.open('POST', SLACK_SUPPORT_WEBHOOK_URL);
  xhr.send(jsonSlackPayload);
};