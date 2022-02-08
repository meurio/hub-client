/**
 * REGRAS DE NEGOCIO
 * 	
 *  Meta total:	1470000	(Aproximadamente 1%)
 *  Meta por estado: 0,3% do eleitorado	(Min 5 Estados)
 */
const states: Record<string, number> = {
  "AC":	561261,
  "AL":	2219318,
  "AM":	2503269,
  "AP":	517102,
  "BA":	10893320,
  "CE":	6567760,
  "ES":	2810132,
  "GO":	4606112,
  "MA":	4758629,
  "MG":	15889559,
  "MS":	1932293,
  "MT":	2317102,
  "PA":	5758119,
  "PB":	2966759,
  "PE":	6732607,
  "PI":	2456056,
  "PR":	8152710,
  "RJ":	12455812,
  "RN":	2447178,
  "RO":	1190505,
  "RR":	342651,
  "RS":	8423308,
  "SC":	5205931,
  "SE":	1610407,
  "SP":	33565294,
  "TO":	1035289,
}

export default {
  goal: {
    state: 0.003,
    total: 0.01
  },
  states,
  total: Object.values(states).reduce((a, b) => a + b, 0)
}