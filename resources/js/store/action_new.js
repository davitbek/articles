import ApiService from '../services/api';

const coreState = {
    loading: false,
    is_called:false,
    data: [],
    errors: {},
    params: {}
};

export default {
    process(options) {
        const method = options.method || 'query'
        let optionState = options.state || [];
        const defaultState = {...coreState, ...optionState};

        if (options.single) {
            defaultState.data = {};
        }
        if (options.paginate) {
            defaultState.data = {
                data: [],
                links: {},
                meta: {},
            };
        }

        let getters = {};
        let getterName = options.stateName.replace('Request', '');
        if (method == 'query') {
            getterName = getterName.replace('get', '');
            getterName = getterName.charAt(0).toLowerCase() + getterName.slice(1);
        } else  {
            // todo
        }

        if (options.getters && typeof options.getters === 'function') {
            getters = {
                [getterName](state, getters) {
                    return options.getters(state[options.stateName], state, getters);
                }
            };
        } else  {
            getters = {
                [getterName](state) {
                    return state[options.stateName].data;
                },
            };
        }

        getters = {
            ...getters,
            ...{
                [getterName + 'IsCalled'](state, getters) {
                    return state[options.stateName].is_called;
                },
                [getterName + 'Loading'](state, getters) {
                    return state[options.stateName].loading;
                }
            }
        };

        let state = {
            [options.stateName]: defaultState
        };

        let actions = {
            [options.action](context, params) {
                params = params ? params : {};

                if (options.params) {
                    params = {...params, ...options.params};
                }

                if (options.singleCall) {
                    if (context.state[options.stateName].is_called) {
                        return ;
                    }
                }

                if (options.paginate) {
                    defaultState.data.meta = context.state[options.stateName].data.meta;
                }
                context.state[options.stateName] = {...defaultState, ...{params: params, loading: true, is_called:true}}

                if (options.processAction && typeof options.processAction === 'function') {
                    let response = options.processAction(context, params);
                    if (response) {
                        context.state[options.stateName] = {...defaultState, ...response, ...{loading: false}}
                        return ;
                    }
                }
                let endPoint = options.endPoint;

                return new Promise((resolve, reject) => {
                    let urlParams = {};
                    let bindParams = {};
                    if (typeof params === 'object' && params) {
                        for (let param in params) {
                            if (endPoint.includes(`{${param}}`)) {
                                endPoint = endPoint.replace(`{${param}}`, params[param]);
                                urlParams[param] = params[param];
                            } else {
                                bindParams[param] = params[param];
                            }
                        }
                    }
                    ApiService[method](endPoint, bindParams)
                        .then(response => {
                            context.commit(options.action + '_SUCCESS', response.data);
                            if (options.commit) {
                                for(const commitSuffix in options.commit) {
                                    context.commit(options.commit[commitSuffix] + '_' + commitSuffix.toUpperCase(), {data: response.data, _params: urlParams});
                                }
                            }
                            resolve(response.data);
                        })
                        .catch(({response}) => {
                            context.commit(options.action + '_FAIL', response.data);
                            reject(response.data);
                        });
                });
            }
        };

        if (options.reset) {
            actions = {
                ...actions,
                [options.action + '_RESET'](context) {
                    context.state[options.stateName] = defaultState
                },
            }
        }

        let mutations = {
            [options.action + '_SUCCESS'](state, data) {
                let actionState = state[options.stateName];
                if (options.mutations && typeof options.mutations.successCallback === 'function') {
                    state[options.stateName] = options.mutations.successCallback(actionState, data, state, defaultState);
                } else {
                    if (options.single) {
                        state[options.stateName] = {...actionState, ...{data: data.data, errors: defaultState.errors, loading:false}};
                    } else {
                        state[options.stateName] = {...actionState, ...{data: data, errors: defaultState.errors, loading:false}};
                    }
                }
            },
            [options.action + '_FAIL'](state, errors) {
                if (options.mutations && typeof options.mutations.errorCallback === 'function') {
                    state[options.stateName] = options.mutations.errorCallback(state, errors, defaultState);
                } else {
                    state[options.stateName] = {...state[options.stateName], ...{data:null, errors: errors, loading:false}};
                }
            },
        };

        if (options.customMutations) {
            for (let mutationSuffix in options.customMutations) {
                mutations[options.action + '_' + mutationSuffix] = options.customMutations[mutationSuffix];
            }
        }

        return {
            getters,
            state,
            actions,
            mutations
        };
    },
    processMultiple(options) {
        let getters = {};
        let state = {};
        let actions = {};
        let mutations = {};

        options.map((option) => {
            const processed = this.process(option);

            getters = {...getters, ...processed.getters};
            state = {...state, ...processed.state};
            actions = {...actions, ...processed.actions};
            mutations = {...mutations, ...processed.mutations};
        });

        return {
            getters,
            state,
            actions,
            mutations
        }
    }
}
