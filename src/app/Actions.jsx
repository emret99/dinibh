import axios from 'axios'
import _ from 'lodash'

class Actions {
	apiUrl = process.env.REACT_APP_API_URL +'/api/'
	endpoints = {
		GetToken: {
			api: 'GetToken',
			method: 'POST',
			params: {
				default: {
					SicilNo: null,
					Password: null,
					DeviceId: null,
				}
			}
		},
		CihazListesi: {
			api: 'CihazListesi',
			method: 'GET',
			params: {
				default: {
					
				}
			}
		}
	}

	async generate (key, params) {
		if (!this.endpoints[key]) throw new Error('Invalid Endpoint')
		const endpoint = this.endpoints[key]
		params = _.assign({}, this.actions[key].params.default, params)
		return await axios({
			method: endpoint.method,
			url: this.apiUrl + endpoint.api,
			data: params
		}).json()
	}
}
const Action = new Actions()

export default Action;

