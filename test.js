/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.7.4-335
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v3.js';


// Services

// Functions

export function createResource(...args) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                        (call %init_peer_id% ("getDataSrv" "label") [] label)
                       )
                       (new $resource_id
                        (seq
                         (new $successful
                          (seq
                           (call %init_peer_id% ("peer" "timestamp_sec") [] t)
                           (xor
                            (seq
                             (seq
                              (call -relay- ("registry" "get_key_bytes") [label [] t [] ""] bytes)
                              (xor
                               (call %init_peer_id% ("sig" "sign") [bytes] result)
                               (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                              )
                             )
                             (xor
                              (match result.$.success! false
                               (ap result.$.error.[0]! $error)
                              )
                              (seq
                               (seq
                                (seq
                                 (seq
                                  (seq
                                   (call -relay- ("registry" "get_key_id") [label %init_peer_id%] resource_id-0)
                                   (call -relay- ("op" "string_to_b58") [resource_id-0] k)
                                  )
                                  (call -relay- ("kad" "neighborhood") [k [] []] nodes)
                                 )
                                 (par
                                  (fold nodes n-0
                                   (par
                                    (seq
                                     (xor
                                      (xor
                                       (seq
                                        (seq
                                         (seq
                                          (call n-0 ("peer" "timestamp_sec") [] t-0)
                                          (call n-0 ("trust-graph" "get_weight") [%init_peer_id% t-0] weight)
                                         )
                                         (call n-0 ("registry" "register_key") [label [] t [] "" result.$.signature.[0]! weight t-0] result-0)
                                        )
                                        (xor
                                         (match result-0.$.success! true
                                          (ap true $successful)
                                         )
                                         (ap result-0.$.error! $error)
                                        )
                                       )
                                       (call n-0 ("op" "noop") [])
                                      )
                                      (seq
                                       (call -relay- ("op" "noop") [])
                                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                                      )
                                     )
                                     (call -relay- ("op" "noop") [])
                                    )
                                    (next n-0)
                                   )
                                  )
                                  (null)
                                 )
                                )
                                (new $status
                                 (new $result-1
                                  (seq
                                   (seq
                                    (seq
                                     (par
                                      (seq
                                       (seq
                                        (call -relay- ("math" "sub") [1 1] sub)
                                        (call -relay- ("op" "noop") [$successful.$.[sub]!])
                                       )
                                       (ap "ok" $status)
                                      )
                                      (call -relay- ("peer" "timeout") [6000 "timeout"] $status)
                                     )
                                     (call -relay- ("op" "identity") [$status.$.[0]!] stat)
                                    )
                                    (xor
                                     (match stat "ok"
                                      (ap true $result-1)
                                     )
                                     (ap false $result-1)
                                    )
                                   )
                                   (call -relay- ("op" "identity") [$result-1] result-fix)
                                  )
                                 )
                                )
                               )
                               (xor
                                (match result-fix.$.[0]! false
                                 (ap "resource wasn't created: timeout exceeded" $error)
                                )
                                (ap resource_id-0 $resource_id)
                               )
                              )
                             )
                            )
                            (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                           )
                          )
                         )
                         (call %init_peer_id% ("op" "identity") [$resource_id] resource_id-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [resource_id-fix $error])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 5])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "createResource",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "label" : {
                    "tag" : "scalar",
                    "name" : "string"
                }
            }
        },
        "codomain" : {
            "tag" : "unlabeledProduct",
            "items" : [
                {
                    "tag" : "option",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "string"
                    }
                },
                {
                    "tag" : "array",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "string"
                    }
                }
            ]
        }
    },
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}
