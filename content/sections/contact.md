+++

title = "contactez-nous"
draft = false
weight = 4

type = "contact"

[thanks]
title = "Thank you!"
class = "thanks"
content = """
    Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais. Vous pouvez aussi nous rejoindre de 9h à 17h au 1-855-702-1946!
    """

[[form.contact]]
type = "text"
name = "firstname"
placeholder = "prénom"
required = true

[[form.contact]]
type = "text"
name = "lastname"
placeholder = "nom"
required = true

[[form.contact]]
type = "text"
name = "phone"
placeholder = "téléphone"

[[form.contact]]
type = "text"
name = "email"
placeholder = "courriel"
required = true

[[form.contact]]
type = "text"
name = "company"
placeholder = "compagnie"

[[form.contact]]
type = "text"
name = "website"
placeholder = "site web"

[[form.contact]]
type = "textarea"
name = "message"
placeholder = "message"

[[form.contact]]
type = "submit"
name = "send"
placeholder = "envoyer"

+++
