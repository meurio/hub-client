# Pressão

Estrategia de pressão, o Ativista pode pressionar uma lista de alvos por e-mail ou telefone dependendo da tática escolhida pelo Mobilizador.

## Pressão por telefone

Integração com a plataforma do (https://www.twilio.com/voice)[Twilio] para fazer ligações.

#### API GraphQL

Pressões por telefone possui algumas funções criadas na base de dados e mapeadas pela API-v2 no Remote Schemas do Hasura para gerir a integração com o Twilio.

- `addTwilioCall(call: TwilioCalls): TwilioCalls`
```
interface TwilioCalls {
  activist_id?: number;
  widget_id: number;
  from: string;
  to: string;
}
```

- `addTwilioConfiguration(config: TwilioConfigurations): TwilioConfigurations`
```
interface TwilioConfigurations {
  community_id: number;
  twilio_account_sid: string;
  twilio_auth_token: string;
  twilio_number: string;
}
```

- `watchTwilioCallTransitions(call: TwilioCallArguments): TwilioCallTransitions`
```
interface TwilioCallArguments {
  widget_id: number;
  from: string;
}

interface TwilioCallTransitions {  
  widgetId: number;
  activistId: number;
  twilioCallId: number;
  twilioCallAccountSid: string;
  twilioCallCallSid: string;
  twilioCallFrom: string;
  twilioCallTo: string;
  twilioCallTransitionId: number;
  twilioCallTransitionSequenceNumber: string;
  twilioCallTransitionStatus: string;
  twilioCallTransitionCallDuration: string;
  twilioCallTransitionCreatedAt: string;
  twilioCallTransitionUpdatedAt: string;
}
```



<!-- - allTwilioCalls -->
