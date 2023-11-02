let build_spec = {
  openapi: "3.0.0",
  info: {
    title: "ONDC Specification",
    description: "ONDC Specification",
    version: "2.0.0",
  },
  security: [{ SubscriberAuth: [] }],
  paths: {
    "/search": {
      post: {
        tags: ["Provider Platform", "Gateway"],
        description:
          "Consumer Platform declares the customer's intent to buy/avail products or services",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      { properties: { action: { enum: ["search"] } } },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      intent: { $ref: "#/components/schemas/Intent" },
                    },
                  },
                },
                required: ["context", "message"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/select": {
      post: {
        tags: ["Provider Platform"],
        description:
          "Consumer Platform declares the customer's cart (or equivalent) created by selecting objects from the catalog",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["select"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order: { $ref: "#/components/schemas/Order" },
                    },
                    required: ["order"],
                  },
                },
                required: ["context", "message"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/init": {
      post: {
        tags: ["Provider Platform"],
        description:
          "Initialize an order by providing billing and/or shipping details",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["init"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order: { $ref: "#/components/schemas/Order" },
                    },
                    required: ["order"],
                  },
                },
                required: ["context", "message"],
              },
            },
          },
        },
        responses: {
          default: {
            description:
              "Acknowledgement of message received after successful validation of schema and signature",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "object",
                      properties: {
                        ack: {
                          allOf: [
                            { $ref: "#/components/schemas/Ack" },
                            {
                              properties: { status: { enum: ["ACK", "NACK"] } },
                            },
                          ],
                        },
                      },
                      required: ["ack"],
                    },
                    error: { $ref: "#/components/schemas/Error" },
                  },
                  required: ["message"],
                },
              },
            },
          },
        },
      },
    },
    "/confirm": {
      post: {
        tags: ["Provider Platform"],
        description:
          "Initialize an order by providing billing and/or shipping details",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["confirm"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order: { $ref: "#/components/schemas/Order" },
                    },
                    required: ["order"],
                  },
                },
                required: ["context", "message"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/status": {
      post: {
        tags: ["Provider Platform"],
        description: "Fetch the latest order object",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["status"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order_id: {
                        $ref: "#/components/schemas/Order/properties/id",
                      },
                    },
                    required: ["order_id"],
                  },
                },
                required: ["context", "message"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/track": {
      post: {
        tags: ["Provider Platform"],
        description: "Track an active order",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["track"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order_id: {
                        $ref: "#/components/schemas/Order/properties/id",
                      },
                      callback_url: { type: "string", format: "uri" },
                    },
                    required: ["order_id"],
                  },
                },
                required: ["context", "message"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/cancel": {
      post: {
        tags: ["Provider Platform"],
        description: "Cancel an order",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["cancel"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order_id: {
                        $ref: "#/components/schemas/Order/properties/id",
                      },
                      cancellation_reason_id: {
                        $ref: "#/components/schemas/Option/properties/id",
                      },
                      descriptor: { $ref: "#/components/schemas/Descriptor" },
                    },
                    required: ["order_id"],
                  },
                },
                required: ["context", "message"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/update": {
      post: {
        tags: ["Provider Platform"],
        description: "Remove object",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["update"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      update_target: {
                        description:
                          'Comma separated values of order objects being updated. For example: ```"update_target":"item,billing,fulfillment"```',
                        type: "string",
                      },
                      order: {
                        description: "Updated order object",
                        allOf: [{ $ref: "#/components/schemas/Order" }],
                      },
                    },
                    required: ["update_target", "order"],
                  },
                },
                required: ["context", "message"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/rating": {
      post: {
        tags: ["Provider Platform"],
        description: "Provide feedback on a service",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["rating"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      ratings: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Rating" },
                      },
                    },
                  },
                },
                required: ["context", "message"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/support": {
      post: {
        tags: ["Provider Platform"],
        description: "Contact support",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["support"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      support: { $ref: "#/components/schemas/Support" },
                    },
                  },
                },
                required: ["context", "message"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/on_search": {
      post: {
        tags: ["Consumer Platform"],
        description:
          "Provider Platform sends its catalog in response to a search request.",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["on_search"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      catalog: { $ref: "#/components/schemas/Catalog" },
                    },
                    required: ["catalog"],
                  },
                  error: { $ref: "#/components/schemas/Error" },
                },
                required: ["context"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/on_select": {
      post: {
        tags: ["Consumer Platform"],
        description:
          "Send draft order object with quoted price for selected items",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["on_select"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order: { $ref: "#/components/schemas/Order" },
                    },
                  },
                  error: { $ref: "#/components/schemas/Error" },
                },
                required: ["context"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/on_init": {
      post: {
        tags: ["Consumer Platform"],
        description: "Send order object with payment details updated",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["on_init"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order: { $ref: "#/components/schemas/Order" },
                    },
                    required: ["order"],
                  },
                  error: { $ref: "#/components/schemas/Error" },
                },
                required: ["context"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/on_confirm": {
      post: {
        tags: ["Consumer Platform"],
        description: "Send active order object",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["on_confirm"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order: { $ref: "#/components/schemas/Order" },
                    },
                    required: ["order"],
                  },
                  error: { $ref: "#/components/schemas/Error" },
                },
                required: ["context"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/on_track": {
      post: {
        tags: ["Consumer Platform"],
        description: "Send tracking details of an active order",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["on_track"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      tracking: { $ref: "#/components/schemas/Tracking" },
                    },
                    required: ["tracking"],
                  },
                  error: { $ref: "#/components/schemas/Error" },
                },
                required: ["context"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/on_cancel": {
      post: {
        tags: ["Consumer Platform"],
        description:
          "Send cancellation request_id with reasons list in case of cancellation request. Else send cancelled order object",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["on_cancel"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order: { $ref: "#/components/schemas/Order" },
                    },
                    required: ["order"],
                  },
                  error: { $ref: "#/components/schemas/Error" },
                },
                required: ["context"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/on_update": {
      post: {
        tags: ["Consumer Platform"],
        description: "Returns updated service with updated runtime object",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["on_update"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order: { $ref: "#/components/schemas/Order" },
                    },
                    required: ["order"],
                  },
                  error: { $ref: "#/components/schemas/Error" },
                },
                required: ["context"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/on_status": {
      post: {
        tags: ["Consumer Platform"],
        description: "Fetch the status of a Service",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["on_status"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order: { $ref: "#/components/schemas/Order" },
                    },
                    required: ["order"],
                  },
                  error: { $ref: "#/components/schemas/Error" },
                },
                required: ["context"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/on_rating": {
      post: {
        tags: ["Consumer Platform"],
        description: "Provide feedback on a service",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["on_rating"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      feedback_form: {
                        description:
                          "A feedback form to allow the user to provide additional information on the rating provided",
                        allOf: [{ $ref: "#/components/schemas/XInput" }],
                      },
                    },
                  },
                  error: { $ref: "#/components/schemas/Error" },
                },
                required: ["context", "message"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/on_support": {
      post: {
        tags: ["Consumer Platform"],
        description: "Contact Support",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["on_support"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      support: { $ref: "#/components/schemas/Support" },
                    },
                  },
                  error: { $ref: "#/components/schemas/Error" },
                },
                required: ["context"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      SubscriberAuth: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description:
          'Signature of message body using Consumer Platform or Provider Platform subscriber\'s signing public key. <br/><br/>Format:<br/><br/><code>Authorization : Signature keyId="{subscriber_id}|{unique_key_id}|{algorithm}",algorithm="ed25519",created="1606970629",expires="1607030629",headers="(created) (expires) digest",signature="Base64(signing string)"</code>',
      },
    },
    schemas: {
      Ack: {
        description:
          "Describes the acknowledgement sent in response to an API call. If the implementation uses HTTP/S, then Ack must be returned in the same session. Every API call to a BPP must be responded to with an Ack whether the BPP intends to respond with a callback or not. This has one property called `status` that indicates the status of the Acknowledgement.",
        type: "object",
        properties: {
          status: {
            type: "string",
            description:
              "The status of the acknowledgement. If the request passes the validation criteria of the BPP, then this is set to ACK. If a BPP responds with status = `ACK` to a request, it is required to respond with a callback. If the request fails the validation criteria, then this is set to NACK. Additionally, if a BPP does not intend to respond with a callback even after the request meets the validation criteria, it should set this value to `NACK`.",
            enum: ["ACK", "NACK"],
          },
          tags: {
            description:
              "A list of tags containing any additional information sent along with the Acknowledgement.",
            type: "array",
            items: { $ref: "#/components/schemas/TagGroup" },
          },
        },
      },
      AddOn: {
        description:
          "Describes an additional item offered as a value-addition to a product or service. This does not exist independently in a catalog and is always associated with an item.",
        type: "object",
        properties: {
          id: {
            description: "Provider-defined ID of the add-on",
            type: "string",
          },
          descriptor: { $ref: "#/components/schemas/Descriptor" },
          price: { $ref: "#/components/schemas/Price" },
        },
      },
      Address: { description: "Describes a postal address.", type: "string" },
      Agent: {
        description:
          "Describes the direct performer, driver or executor that fulfills an order. It is usually a person. But in some rare cases, it could be a non-living entity like a drone, or a bot. Some examples of agents are Doctor in the healthcare sector, a driver in the mobility sector, or a delivery person in the logistics sector. This object can be set at any stage of the order lifecycle. This can be set at the discovery stage when the BPP wants to provide details on the agent fulfilling the order, like in healthcare, where the doctor's name appears during search. This object can also used to search for a particular person that the customer wants fulfilling an order. Sometimes, this object gets instantiated after the order is confirmed, like in the case of on-demand taxis, where the driver is assigned after the user confirms the ride.",
        properties: {
          person: { $ref: "#/components/schemas/Person" },
          contact: { $ref: "#/components/schemas/Contact" },
          organization: { $ref: "#/components/schemas/Organization" },
          rating: { $ref: "#/components/schemas/Rating/properties/value" },
        },
      },
      Authorization: {
        description:
          "Describes an authorization mechanism used to start or end the fulfillment of an order. For example, in the mobility sector, the driver may require a one-time password to initiate the ride. In the healthcare sector, a patient may need to provide a password to open a video conference link during a teleconsultation.",
        type: "object",
        properties: {
          type: {
            description:
              "Type of authorization mechanism used. The allowed values for this field can be published as part of the network policy.",
            type: "string",
          },
          token: {
            description:
              "Token used for authorization. This is typically generated at the BPP. The BAP can send this value to the user via any channel that it uses to authenticate the user like SMS, Email, Push notification, or in-app rendering.",
            type: "string",
          },
          valid_from: {
            description:
              "Timestamp in RFC3339 format from which token is valid",
            type: "string",
            format: "date-time",
          },
          valid_to: {
            description:
              "Timestamp in RFC3339 format until which token is valid",
            type: "string",
            format: "date-time",
          },
          status: { description: "Status of the token", type: "string" },
        },
      },
      Billing: {
        description:
          "Describes the billing details of an entity.<br>This has properties like name,organization,address,email,phone,time,tax_number, created_at,updated_at",
        type: "object",
        properties: {
          name: { description: "Name of the billable entity", type: "string" },
          organization: {
            description: "Details of the organization being billed.",
            allOf: [{ $ref: "#/components/schemas/Organization" }],
          },
          address: {
            description: "The address of the billable entity",
            allOf: [{ $ref: "#/components/schemas/Address" }],
          },
          state: {
            description:
              "The state where the billable entity resides. This is important for state-level tax calculation",
            allOf: [{ $ref: "#/components/schemas/State" }],
          },
          city: {
            description: "The city where the billable entity resides.",
            allOf: [{ $ref: "#/components/schemas/City" }],
          },
          email: {
            description: "Email address where the bill is sent to",
            type: "string",
            format: "email",
          },
          phone: {
            description: "Phone number of the billable entity",
            type: "string",
          },
          time: {
            description: "Details regarding the billing period",
            allOf: [{ $ref: "#/components/schemas/Time" }],
          },
          tax_id: {
            description:
              "ID of the billable entity as recognized by the taxation authority",
            type: "string",
          },
        },
      },
      Cancellation: {
        description: "Describes a cancellation event",
        type: "object",
        properties: {
          time: {
            description: "Date-time when the order was cancelled by the buyer",
            type: "string",
            format: "date-time",
          },
          cancelled_by: { type: "string", enum: ["CONSUMER", "PROVIDER"] },
          reason: {
            description: "The reason for cancellation",
            allOf: [{ $ref: "#/components/schemas/Option" }],
          },
          additional_description: {
            description:
              "Any additional information regarding the nature of cancellation",
            allOf: [{ $ref: "#/components/schemas/Descriptor" }],
          },
        },
      },
      CancellationTerm: {
        description:
          "Describes the cancellation terms of an item or an order. This can be referenced at an item or order level. Item-level cancellation terms can override the terms at the order level.",
        type: "object",
        properties: {
          fulfillment_state: {
            description:
              "The state of fulfillment during which this term is applicable.",
            allOf: [{ $ref: "#/components/schemas/FulfillmentState" }],
          },
          reason_required: {
            description:
              "Indicates whether a reason is required to cancel the order",
            type: "boolean",
          },
          cancel_by: {
            description: "Information related to the time of cancellation.",
            allOf: [{ $ref: "#/components/schemas/Time" }],
          },
          cancellation_fee: { $ref: "#/components/schemas/Fee" },
          xinput: { $ref: "#/components/schemas/XInput" },
          external_ref: { $ref: "#/components/schemas/MediaFile" },
        },
      },
      Catalog: {
        description:
          "Describes the products or services offered by a BPP. This is typically sent as the response to a search intent from a BAP. The payment terms, offers and terms of fulfillment supported by the BPP can also be included here. The BPP can show hierarchical nature of products/services in its catalog using the parent_category_id in categories. The BPP can also send a ttl (time to live) in the context which is the duration for which a BAP can cache the catalog and use the cached catalog.  <br>This has properties like bbp/descriptor,bbp/categories,bbp/fulfillments,bbp/payments,bbp/offers,bbp/providers and exp<br>This is used in the following situations.<br><ul><li>This is typically used in the discovery stage when the BPP sends the details of the products and services it offers as response to a search intent from the BAP. </li></ul>",
        type: "object",
        properties: {
          descriptor: { $ref: "#/components/schemas/Descriptor" },
          fulfillments: {
            description:
              "Fulfillment modes offered at the BPP level. This is used when a BPP itself offers fulfillments on behalf of the providers it has onboarded.",
            type: "array",
            items: { $ref: "#/components/schemas/Fulfillment" },
          },
          payments: {
            description:
              "Payment terms offered by the BPP for all transactions. This can be overriden at the provider level.",
            type: "array",
            items: { $ref: "#/components/schemas/Payment" },
          },
          offers: {
            description:
              "Offers at the BPP-level. This is common across all providers onboarded by the BPP.",
            type: "array",
            items: { $ref: "#/components/schemas/Offer" },
          },
          providers: {
            type: "array",
            items: { $ref: "#/components/schemas/Provider" },
          },
          exp: {
            description: "Timestamp after which catalog will expire",
            type: "string",
            format: "date-time",
          },
          ttl: {
            description:
              "Duration in seconds after which this catalog will expire",
            type: "string",
          },
        },
      },
      Category: {
        description:
          "A label under which a collection of items can be grouped.",
        type: "object",
        properties: {
          id: { description: "ID of the category", type: "string" },
          parent_category_id: {
            $ref: "#/components/schemas/Category/properties/id",
          },
          descriptor: { $ref: "#/components/schemas/Descriptor" },
          time: { $ref: "#/components/schemas/Time" },
          ttl: { description: "Time to live for an instance of this schema" },
          tags: {
            type: "array",
            items: { $ref: "#/components/schemas/TagGroup" },
          },
        },
      },
      Circle: {
        description:
          "Describes a circular region of a specified radius centered at a specified GPS coordinate.",
        type: "object",
        properties: {
          gps: { $ref: "#/components/schemas/Gps" },
          radius: { $ref: "#/components/schemas/Scalar" },
        },
      },
      City: {
        description: "Describes a city",
        type: "object",
        properties: {
          name: { description: "Name of the city", type: "string" },
          code: { description: "City code", type: "string" },
        },
      },
      Contact: {
        description: "Describes the contact information of an entity",
        type: "object",
        properties: {
          phone: { type: "string" },
          email: { type: "string" },
          jcard: {
            type: "object",
            description:
              "A Jcard object as per draft-ietf-jcardcal-jcard-03 specification",
          },
        },
      },
      Context: {
        description:
          "Every API call in beckn protocol has a context. It provides a high-level overview to the receiver about the nature of the intended transaction. Typically, it is the BAP that sets the transaction context based on the consumer's location and action on their UI. But sometimes, during unsolicited callbacks, the BPP also sets the transaction context but it is usually the same as the context of a previous full-cycle, request-callback interaction between the BAP and the BPP. The context object contains four types of fields. <ol><li>Demographic information about the transaction using fields like `domain`, `country`, and `region`.</li><li>Addressing details like the sending and receiving platform's ID and API URL.</li><li>Interoperability information like the protocol version that implemented by the sender and,</li><li>Transaction details like the method being called at the receiver's endpoint, the transaction_id that represents an end-to-end user session at the BAP, a message ID to pair requests with callbacks, a timestamp to capture sending times, a ttl to specifiy the validity of the request, and a key to encrypt information if necessary.</li></ol> This object must be passed in every interaction between a BAP and a BPP. In HTTP/S implementations, it is not necessary to send the context during the synchronous response. However, in asynchronous protocols, the context must be sent during all interactions,",
        type: "object",
        properties: {
          domain: {
            description:
              "Domain code that is relevant to this transaction context",
            allOf: [{ $ref: "#/components/schemas/Domain/properties/code" }],
          },
          location: {
            description:
              "The location where the transaction is intended to be fulfilled.",
            allOf: [{ $ref: "#/components/schemas/Location" }],
          },
          action: {
            description:
              "The Beckn protocol method being called by the sender and executed at the receiver.",
            type: "string",
          },
          version: {
            type: "string",
            description:
              "Version of transaction protocol being used by the sender.",
          },
          bap_id: {
            description: "Subscriber ID of the BAP",
            allOf: [
              {
                description:
                  "A globally unique identifier of the platform, Typically it is the fully qualified domain name (FQDN) of the platform.",
                type: "string",
              },
            ],
          },
          bap_uri: {
            description:
              "Subscriber URL of the BAP for accepting callbacks from BPPs.",
            allOf: [
              {
                description:
                  "The callback URL of the Subscriber. This should necessarily contain the same domain name as set in `subscriber_id``.",
                type: "string",
                format: "uri",
              },
            ],
          },
          bpp_id: {
            description: "Subscriber ID of the BPP",
            allOf: [
              {
                $ref: "#/components/schemas/Context/properties/bap_id/allOf/0",
              },
            ],
          },
          bpp_uri: {
            description:
              "Subscriber URL of the BPP for accepting calls from BAPs.",
            allOf: [
              {
                $ref: "#/components/schemas/Context/properties/bap_uri/allOf/0",
              },
            ],
          },
          transaction_id: {
            description:
              "This is a unique value which persists across all API calls from `search` through `confirm`. This is done to indicate an active user session across multiple requests. The BPPs can use this value to push personalized recommendations, and dynamic offerings related to an ongoing transaction despite being unaware of the user active on the BAP.",
            type: "string",
            format: "uuid",
          },
          message_id: {
            description:
              "This is a unique value which persists during a request / callback cycle. Since beckn protocol APIs are asynchronous, BAPs need a common value to match an incoming callback from a BPP to an earlier call. This value can also be used to ignore duplicate messages coming from the BPP. It is recommended to generate a fresh message_id for every new interaction. When sending unsolicited callbacks, BPPs must generate a new message_id.",
            type: "string",
            format: "uuid",
          },
          timestamp: {
            description: "Time of request generation in RFC3339 format",
            type: "string",
            format: "date-time",
          },
          key: {
            description: "The encryption public key of the sender",
            type: "string",
          },
          ttl: {
            description:
              "The duration in ISO8601 format after timestamp for which this message holds valid",
            type: "string",
          },
        },
      },
      Country: {
        description: "Describes a country",
        type: "object",
        properties: {
          name: { type: "string", description: "Name of the country" },
          code: {
            type: "string",
            description: "Country code as per ISO 3166-1 and ISO 3166-2 format",
          },
        },
      },
      Credential: {
        description:
          "Describes a credential of an entity - Person or Organization",
        type: "object",
        properties: {
          id: { type: "string" },
          type: { type: "string", default: "VerifiableCredential" },
          url: {
            description: "URL of the credential",
            type: "string",
            format: "uri",
          },
        },
      },
      Customer: {
        description:
          "Describes a customer buying/availing a product or a service",
        type: "object",
        properties: {
          person: { $ref: "#/components/schemas/Person" },
          contact: { $ref: "#/components/schemas/Contact" },
        },
      },
      DecimalValue: {
        description: "Describes a numerical value in decimal form",
        type: "string",
        pattern: "[+-]?([0-9]*[.])?[0-9]+",
      },
      Descriptor: {
        description: "Physical description of something.",
        type: "object",
        properties: {
          name: { type: "string" },
          code: { type: "string" },
          short_desc: { type: "string" },
          long_desc: { type: "string" },
          additional_desc: {
            type: "object",
            properties: {
              url: { type: "string" },
              content_type: {
                type: "string",
                enum: ["text/plain", "text/html", "application/json"],
              },
            },
          },
          media: {
            type: "array",
            items: { $ref: "#/components/schemas/MediaFile" },
          },
          images: {
            type: "array",
            items: { $ref: "#/components/schemas/Image" },
          },
        },
      },
      Domain: {
        description:
          "Described the industry sector or sub-sector. The network policy should contain codes for all the industry sectors supported by the network. Domains can be created in varying levels of granularity. The granularity of a domain can be decided by the participants of the network. Too broad domains will result in irrelevant search broadcast calls to BPPs that don't have services supporting the domain. Too narrow domains will result in a large number of registry entries for each BPP. It is recommended that network facilitators actively collaborate with various working groups and network participants to carefully choose domain codes keeping in mind relevance, performance, and opportunity cost. It is recommended that networks choose broad domains like mobility, logistics, healthcare etc, and progressively granularize them as and when the number of network participants for each domain grows large.",
        type: "object",
        properties: {
          name: { description: "Name of the domain", type: "string" },
          code: {
            description:
              "Standard code representing the domain. The standard is usually published as part of the network policy. Furthermore, the network facilitator should also provide a mechanism to provide the supported domains of a network.",
          },
          additional_info: {
            description:
              "A url that contains addtional information about that domain.",
            allOf: [{ $ref: "#/components/schemas/MediaFile" }],
          },
        },
      },
      Duration: {
        description: "Describes duration as per ISO8601 format",
        type: "string",
      },
      Error: {
        description:
          "Describes an error object that is returned by a BAP, BPP or BG as a response or callback to an action by another network participant. This object is sent when any request received by a network participant is unacceptable. This object can be sent either during Ack or with the callback.",
        type: "object",
        properties: {
          code: {
            type: "string",
            description:
              'Standard error code. For full list of error codes, refer to docs/protocol-drafts/BECKN-005-ERROR-CODES-DRAFT-01.md of this repo"',
          },
          paths: {
            type: "string",
            description:
              "Path to json schema generating the error. Used only during json schema validation errors",
          },
          message: {
            type: "string",
            description:
              "Human readable message describing the error. Used mainly for logging. Not recommended to be shown to the user.",
          },
        },
      },
      Fee: {
        description: "A fee applied on a particular entity",
        type: "object",
        properties: {
          percentage: {
            description: "Percentage of a value",
            allOf: [{ $ref: "#/components/schemas/DecimalValue" }],
          },
          amount: {
            description: "A fixed value",
            allOf: [{ $ref: "#/components/schemas/Price" }],
          },
        },
      },
      Form: {
        description: "Describes a form",
        type: "object",
        properties: {
          url: {
            description:
              "The URL from where the form can be fetched. The content fetched from the url must be processed as per the mime_type specified in this object. Once fetched, the rendering platform can choosed to render the form as-is as an embeddable element; or process it further to blend with the theme of the application. In case the interface is non-visual, the the render can process the form data and reproduce it as per the standard specified in the form.",
            type: "string",
            format: "uri",
          },
          data: {
            description: "The form submission data",
            type: "object",
            additionalProperties: { type: "string" },
          },
          mime_type: {
            description:
              "This field indicates the nature and format of the form received by querying the url. MIME types are defined and standardized in IETF's RFC 6838.",
            type: "string",
            enum: ["text/html", "application/xml"],
          },
          submission_id: { type: "string", format: "uuid" },
        },
      },
      Fulfillment: {
        description:
          "Describes how a an order will be rendered/fulfilled to the end-customer",
        type: "object",
        properties: {
          id: {
            description: "Unique reference ID to the fulfillment of an order",
            type: "string",
          },
          type: {
            description:
              "A code that describes the mode of fulfillment. This is typically set when there are multiple ways an order can be fulfilled. For example, a retail order can be fulfilled either via store pickup or a home delivery. Similarly, a medical consultation can be provided either in-person or via tele-consultation. The network policy must publish standard fulfillment type codes for the different modes of fulfillment.",
            type: "string",
          },
          rateable: {
            description: "Whether the fulfillment can be rated or not",
            type: "boolean",
          },
          rating: {
            description: "The rating value of the fulfullment service.",
            allOf: [{ $ref: "#/components/schemas/Rating/properties/value" }],
          },
          state: {
            description:
              "The current state of fulfillment. The BPP must set this value whenever the state of the order fulfillment changes and fire an unsolicited `on_status` call.",
            allOf: [{ $ref: "#/components/schemas/FulfillmentState" }],
          },
          tracking: {
            type: "boolean",
            description: "Indicates whether the fulfillment allows tracking",
            default: false,
          },
          customer: {
            description: "The person that will ultimately receive the order",
            allOf: [{ $ref: "#/components/schemas/Customer" }],
          },
          agent: {
            description:
              "The agent that is currently handling the fulfillment of the order",
            allOf: [{ $ref: "#/components/schemas/Agent" }],
          },
          contact: { $ref: "#/components/schemas/Contact" },
          vehicle: { $ref: "#/components/schemas/Vehicle" },
          stops: {
            description:
              "The list of logical stops encountered during the fulfillment of an order.",
            type: "array",
            items: { $ref: "#/components/schemas/Stop" },
          },
          path: {
            description:
              "The physical path taken by the agent that can be rendered on a map. The allowed format of this property can be set by the network.",
            type: "string",
          },
          tags: {
            type: "array",
            items: { $ref: "#/components/schemas/TagGroup" },
          },
        },
      },
      FulfillmentState: {
        description: "Describes the state of fulfillment",
        type: "object",
        properties: {
          descriptor: { $ref: "#/components/schemas/Descriptor" },
          updated_at: { type: "string", format: "date-time" },
          updated_by: {
            type: "string",
            description: "ID of entity which changed the state",
          },
        },
      },
      Gps: {
        description: "Describes a GPS coordinate",
        type: "string",
        pattern:
          "^[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?),\\s*[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$",
      },
      Image: {
        description: "Describes an image",
        type: "object",
        properties: {
          url: {
            description:
              "URL to the image. This can be a data url or an remote url",
            type: "string",
            format: "uri",
          },
          size_type: {
            description:
              "The size of the image. The network policy can define the default dimensions of each type",
            type: "string",
            enum: ["xs", "sm", "md", "lg", "xl", "custom"],
          },
          width: {
            description: "Width of the image in pixels",
            type: "string",
          },
          height: {
            description: "Height of the image in pixels",
            type: "string",
          },
        },
      },
      Intent: {
        description:
          "The intent to buy or avail a product or a service. The BAP can declare the intent of the consumer containing <ul><li>What they want (A product, service, offer)</li><li>Who they want (A seller, service provider, agent etc)</li><li>Where they want it and where they want it from</li><li>When they want it (start and end time of fulfillment</li><li>How they want to pay for it</li></ul><br>This has properties like descriptor,provider,fulfillment,payment,category,offer,item,tags<br>This is typically used by the BAP to send the purpose of the user's search to the BPP. This will be used by the BPP to find products or services it offers that may match the user's intent.<br>For example, in Mobility, the mobility consumer declares a mobility intent. In this case, the mobility consumer declares information that describes various aspects of their journey like,<ul><li>Where would they like to begin their journey (intent.fulfillment.start.location)</li><li>Where would they like to end their journey (intent.fulfillment.end.location)</li><li>When would they like to begin their journey (intent.fulfillment.start.time)</li><li>When would they like to end their journey (intent.fulfillment.end.time)</li><li>Who is the transport service provider they would like to avail services from (intent.provider)</li><li>Who is traveling (This is not recommended in public networks) (intent.fulfillment.customer)</li><li>What kind of fare product would they like to purchase (intent.item)</li><li>What add-on services would they like to avail</li><li>What offers would they like to apply on their booking (intent.offer)</li><li>What category of services would they like to avail (intent.category)</li><li>What additional luggage are they carrying</li><li>How would they like to pay for their journey (intent.payment)</li></ul><br>For example, in health domain, a consumer declares the intent for a lab booking the describes various aspects of their booking like,<ul><li>Where would they like to get their scan/test done (intent.fulfillment.start.location)</li><li>When would they like to get their scan/test done (intent.fulfillment.start.time)</li><li>When would they like to get the results of their test/scan (intent.fulfillment.end.time)</li><li>Who is the service provider they would like to avail services from (intent.provider)</li><li>Who is getting the test/scan (intent.fulfillment.customer)</li><li>What kind of test/scan would they like to purchase (intent.item)</li><li>What category of services would they like to avail (intent.category)</li><li>How would they like to pay for their journey (intent.payment)</li></ul>",
        type: "object",
        properties: {
          descriptor: {
            description:
              "A raw description of the search intent. Free text search strings, raw audio, etc can be sent in this object.",
            allOf: [{ $ref: "#/components/schemas/Descriptor" }],
          },
          provider: {
            description:
              "The provider from which the customer wants to place to the order from",
            allOf: [{ $ref: "#/components/schemas/Provider" }],
          },
          fulfillment: {
            description:
              "Details on how the customer wants their order fulfilled",
            allOf: [{ $ref: "#/components/schemas/Fulfillment" }],
          },
          payment: {
            description:
              "Details on how the customer wants to pay for the order",
            allOf: [{ $ref: "#/components/schemas/Payment" }],
          },
          category: {
            description: "Details on the item category",
            allOf: [{ $ref: "#/components/schemas/Category" }],
          },
          offer: {
            description: "details on the offer the customer wants to avail",
            allOf: [{ $ref: "#/components/schemas/Offer" }],
          },
          item: {
            description: "Details of the item that the consumer wants to order",
            allOf: [{ $ref: "#/components/schemas/Item" }],
          },
          tags: {
            type: "array",
            items: { $ref: "#/components/schemas/TagGroup" },
          },
        },
      },
      ItemQuantity: {
        description: "Describes the count or amount of an item",
        type: "object",
        properties: {
          allocated: {
            description:
              "This represents the exact quantity allocated for purchase of the item.",
            type: "object",
            properties: {
              count: { type: "integer", minimum: 0 },
              measure: { $ref: "#/components/schemas/Scalar" },
            },
          },
          available: {
            description:
              "This represents the exact quantity available for purchase of the item. The buyer can only purchase multiples of this",
            type: "object",
            properties: {
              count: { type: "integer", minimum: 0 },
              measure: { $ref: "#/components/schemas/Scalar" },
            },
          },
          maximum: {
            description:
              "This represents the maximum quantity allowed for purchase of the item",
            type: "object",
            properties: {
              count: { type: "integer", minimum: 1 },
              measure: { $ref: "#/components/schemas/Scalar" },
            },
          },
          minimum: {
            description:
              "This represents the minimum quantity allowed for purchase of the item",
            type: "object",
            properties: {
              count: { type: "integer", minimum: 0 },
              measure: { $ref: "#/components/schemas/Scalar" },
            },
          },
          selected: {
            description:
              "This represents the quantity selected for purchase of the item",
            type: "object",
            properties: {
              count: { type: "integer", minimum: 0 },
              measure: { $ref: "#/components/schemas/Scalar" },
            },
          },
          unitized: {
            description:
              "This represents the quantity available in a single unit of the item",
            type: "object",
            properties: {
              count: { type: "integer", minimum: 1, maximum: 1 },
              measure: { $ref: "#/components/schemas/Scalar" },
            },
          },
        },
      },
      Item: {
        description:
          "Describes a product or a service offered to the end consumer by the provider. In the mobility sector, it can represent a fare product like one way journey. In the logistics sector, it can represent the delivery service offering. In the retail domain it can represent a product like a grocery item.",
        type: "object",
        properties: {
          id: { description: "ID of the item.", type: "string" },
          parent_item_id: {
            description: "ID of the item, this item is a variant of",
            allOf: [{ $ref: "#/components/schemas/Item/properties/id" }],
          },
          parent_item_quantity: {
            description:
              "The number of units of the parent item this item is a multiple of",
            allOf: [{ $ref: "#/components/schemas/ItemQuantity" }],
          },
          descriptor: {
            description: "Physical description of the item",
            allOf: [{ $ref: "#/components/schemas/Descriptor" }],
          },
          creator: {
            description: "The creator of this item",
            allOf: [{ $ref: "#/components/schemas/Organization" }],
          },
          price: {
            description: "The price of this item, if it has intrinsic value",
            allOf: [{ $ref: "#/components/schemas/Price" }],
          },
          quantity: {
            description: "The selling quantity of the item",
            allOf: [{ $ref: "#/components/schemas/ItemQuantity" }],
          },
          category_ids: {
            description: "Categories this item can be listed under",
            type: "array",
            items: {
              allOf: [{ $ref: "#/components/schemas/Category/properties/id" }],
            },
          },
          fulfillment_ids: {
            description: "Modes through which this item can be fulfilled",
            type: "array",
            items: {
              allOf: [
                { $ref: "#/components/schemas/Fulfillment/properties/id" },
              ],
            },
          },
          location_ids: {
            description: "Provider Locations this item is available in",
            type: "array",
            items: {
              allOf: [{ $ref: "#/components/schemas/Location/properties/id" }],
            },
          },
          payment_ids: {
            description:
              "Payment modalities through which this item can be ordered",
            type: "array",
            items: {
              allOf: [{ $ref: "#/components/schemas/Payment/properties/id" }],
            },
          },
          add_ons: {
            type: "array",
            items: { $ref: "#/components/schemas/AddOn" },
          },
          cancellation_terms: {
            description: "Cancellation terms of this item",
            type: "array",
            items: { $ref: "#/components/schemas/CancellationTerm" },
          },
          refund_terms: {
            description: "Refund terms of this item",
            type: "array",
            items: {
              description: "Refund term of an item or an order",
              type: "object",
              properties: {
                fulfillment_state: {
                  description:
                    "The state of fulfillment during which this term is applicable.",
                  allOf: [{ $ref: "#/components/schemas/State" }],
                },
                refund_eligible: {
                  description:
                    "Indicates if cancellation will result in a refund",
                  type: "boolean",
                },
                refund_within: {
                  description:
                    "Time within which refund will be processed after successful cancellation.",
                  allOf: [{ $ref: "#/components/schemas/Time" }],
                },
                refund_amount: { $ref: "#/components/schemas/Price" },
              },
            },
          },
          replacement_terms: {
            description:
              "Terms that are applicable be met when this item is replaced",
            type: "array",
            items: { $ref: "#/components/schemas/ReplacementTerm" },
          },
          return_terms: {
            description: "Terms that are applicable when this item is returned",
            type: "array",
            items: { $ref: "#/components/schemas/ReturnTerm" },
          },
          xinput: {
            description:
              "Additional input required from the customer to purchase / avail this item",
            allOf: [{ $ref: "#/components/schemas/XInput" }],
          },
          time: {
            description:
              "Temporal attributes of this item. This property is used when the item exists on the catalog only for a limited period of time.",
            allOf: [{ $ref: "#/components/schemas/Time" }],
          },
          rateable: {
            description: "Whether this item can be rated",
            type: "boolean",
          },
          rating: {
            description: "The rating of the item",
            allOf: [{ $ref: "#/components/schemas/Rating/properties/value" }],
          },
          matched: {
            description: "Whether this item is an exact match of the request",
            type: "boolean",
          },
          related: {
            description:
              "Whether this item is a related item to the exactly matched item",
            type: "boolean",
          },
          recommended: {
            description:
              "Whether this item is a recommended item to a response",
            type: "boolean",
          },
          ttl: {
            description:
              "Time to live in seconds for an instance of this schema",
            type: "string",
          },
          tags: {
            type: "array",
            items: { $ref: "#/components/schemas/TagGroup" },
          },
        },
      },
      Location: {
        description: "The physical location of something",
        type: "object",
        properties: {
          id: { type: "string" },
          descriptor: { $ref: "#/components/schemas/Descriptor" },
          map_url: {
            description:
              "The url to the map of the location. This can be a globally recognized map url or the one specified by the network policy.",
            type: "string",
            format: "uri",
          },
          gps: {
            description: "The GPS co-ordinates of this location.",
            allOf: [{ $ref: "#/components/schemas/Gps" }],
          },
          address: {
            description: "The address of this location.",
            allOf: [{ $ref: "#/components/schemas/Address" }],
          },
          city: {
            description: "The city this location is, or is located within",
            allOf: [{ $ref: "#/components/schemas/City" }],
          },
          district: {
            description: "The state this location is, or is located within",
            type: "string",
          },
          state: {
            description: "The state this location is, or is located within",
            allOf: [{ $ref: "#/components/schemas/State" }],
          },
          country: {
            description: "The country this location is, or is located within",
            allOf: [{ $ref: "#/components/schemas/Country" }],
          },
          area_code: { type: "string" },
          circle: { $ref: "#/components/schemas/Circle" },
          polygon: {
            description: "The boundary polygon of this location",
            type: "string",
          },
          "3dspace": {
            description:
              "The three dimensional region describing this location",
            type: "string",
          },
          rating: {
            description: "The rating of this location",
            allOf: [{ $ref: "#/components/schemas/Rating/properties/value" }],
          },
        },
      },
      MediaFile: {
        description: "This object contains a url to a media file.",
        type: "object",
        properties: {
          mimetype: {
            description:
              "indicates the nature and format of the document, file, or assortment of bytes. MIME types are defined and standardized in IETF's RFC 6838",
            type: "string",
          },
          url: {
            description: "The URL of the file",
            type: "string",
            format: "uri",
          },
          signature: {
            description:
              "The digital signature of the file signed by the sender",
            type: "string",
          },
          dsa: {
            description: "The signing algorithm used by the sender",
            type: "string",
          },
        },
      },
      Offer: {
        description:
          "An offer associated with a catalog. This is typically used to promote a particular product and enable more purchases.",
        type: "object",
        properties: {
          id: { type: "string" },
          descriptor: { $ref: "#/components/schemas/Descriptor" },
          location_ids: {
            type: "array",
            items: { $ref: "#/components/schemas/Location/properties/id" },
          },
          category_ids: {
            type: "array",
            items: { $ref: "#/components/schemas/Category/properties/id" },
          },
          item_ids: {
            type: "array",
            items: { $ref: "#/components/schemas/Item/properties/id" },
          },
          time: { $ref: "#/components/schemas/Time" },
          tags: {
            type: "array",
            items: { $ref: "#/components/schemas/TagGroup" },
          },
        },
      },
      Option: {
        description: "Describes a selectable option",
        type: "object",
        properties: {
          id: { type: "string" },
          descriptor: { $ref: "#/components/schemas/Descriptor" },
        },
      },
      Order: {
        description:
          "Describes a legal purchase order. It contains the complete details of the legal contract created between the buyer and the seller.",
        type: "object",
        properties: {
          id: {
            type: "string",
            description:
              "Human-readable ID of the order. This is generated at the BPP layer. The BPP can either generate order id within its system or forward the order ID created at the provider level.",
          },
          ref_order_ids: {
            description:
              "A list of order IDs to link this order to previous orders.",
            type: "array",
            items: { type: "string", description: "ID of a previous order" },
          },
          status: {
            description:
              "Status of the order. Allowed values can be defined by the network policy",
            type: "string",
            enum: ["ACTIVE", "COMPLETE", "CANCELLED"],
          },
          type: {
            description:
              "This is used to indicate the type of order being created to BPPs. Sometimes orders can be linked to previous orders, like a replacement order in a retail domain. A follow-up consultation in healthcare domain. A single order part of a subscription order. The list of order types can be standardized at the network level.",
            type: "string",
            default: "DEFAULT",
            enum: ["DRAFT", "DEFAULT"],
          },
          provider: {
            description:
              "Details of the provider whose catalog items have been selected.",
            allOf: [{ $ref: "#/components/schemas/Provider" }],
          },
          items: {
            description: "The items purchased / availed in this order",
            type: "array",
            items: { $ref: "#/components/schemas/Item" },
          },
          add_ons: {
            description: "The add-ons purchased / availed in this order",
            type: "array",
            items: { $ref: "#/components/schemas/AddOn" },
          },
          offers: {
            description: "The offers applied in this order",
            type: "array",
            items: { $ref: "#/components/schemas/Offer" },
          },
          billing: {
            description: "The billing details of this order",
            allOf: [{ $ref: "#/components/schemas/Billing" }],
          },
          fulfillments: {
            description: "The fulfillments involved in completing this order",
            type: "array",
            items: { $ref: "#/components/schemas/Fulfillment" },
          },
          cancellation: {
            description: "The cancellation details of this order",
            allOf: [{ $ref: "#/components/schemas/Cancellation" }],
          },
          cancellation_terms: {
            description: "Cancellation terms of this item",
            type: "array",
            items: { $ref: "#/components/schemas/CancellationTerm" },
          },
          refund_terms: {
            description: "Refund terms of this item",
            type: "array",
            items: {
              $ref: "#/components/schemas/Item/properties/refund_terms/items",
            },
          },
          replacement_terms: {
            description: "Replacement terms of this item",
            type: "array",
            items: { $ref: "#/components/schemas/ReplacementTerm" },
          },
          return_terms: {
            description: "Return terms of this item",
            type: "array",
            items: { $ref: "#/components/schemas/ReturnTerm" },
          },
          quote: {
            description: "The mutually agreed upon quotation for this order.",
            allOf: [{ $ref: "#/components/schemas/Quotation" }],
          },
          payments: {
            description: "The terms of settlement for this order",
            type: "array",
            items: { $ref: "#/components/schemas/Payment" },
          },
          created_at: {
            description: "The date-time of creation of this order",
            type: "string",
            format: "date-time",
          },
          updated_at: {
            description: "The date-time of updated of this order",
            type: "string",
            format: "date-time",
          },
          xinput: {
            description:
              "Additional input required from the customer to confirm this order",
            allOf: [{ $ref: "#/components/schemas/XInput" }],
          },
          tags: {
            type: "array",
            items: { $ref: "#/components/schemas/TagGroup" },
          },
        },
      },
      Organization: {
        description: "An organization. Usually a recognized business entity.",
        type: "object",
        properties: {
          descriptor: { $ref: "#/components/schemas/Descriptor" },
          address: {
            description: "The postal address of the organization",
            allOf: [{ $ref: "#/components/schemas/Address" }],
          },
          state: {
            description:
              "The state where the organization's address is registered",
            allOf: [{ $ref: "#/components/schemas/State" }],
          },
          city: {
            description:
              "The city where the the organization's address is registered",
            allOf: [{ $ref: "#/components/schemas/City" }],
          },
          contact: { $ref: "#/components/schemas/Contact" },
        },
      },
      Payment: {
        description:
          "Describes the terms of settlement between the BAP and the BPP for a single transaction. When instantiated, this object contains <ol><li>the amount that has to be settled,</li><li>The payment destination destination details</li><li>When the settlement should happen, and</li><li>A transaction reference ID</li></ol>. During a transaction, the BPP reserves the right to decide the terms of payment. However, the BAP can send its terms to the BPP first. If the BPP does not agree to those terms, it must overwrite the terms and return them to the BAP. If overridden, the BAP must either agree to the terms sent by the BPP in order to preserve the provider's autonomy, or abort the transaction. In case of such disagreements, the BAP and the BPP can perform offline negotiations on the payment terms. Once an agreement is reached, the BAP and BPP can resume transactions.",
        type: "object",
        properties: {
          id: {
            description:
              "ID of the payment term that can be referred at an item or an order level in a catalog",
            type: "string",
          },
          collected_by: {
            description:
              "This field indicates who is the collector of payment. The BAP can set this value to 'bap' if it wants to collect the payment first and  settle it to the BPP. If the BPP agrees to those terms, the BPP should not send the payment url. Alternatively, the BPP can set this field with the value 'bpp' if it wants the payment to be made directly.",
          },
          url: {
            type: "string",
            description:
              "A payment url to be called by the BAP. If empty, then the payment is to be done offline. The details of payment should be present in the params object. If tl_method = http/get, then the payment details will be sent as url params. Two url param values, ```$transaction_id``` and ```$amount``` are mandatory.",
            format: "uri",
          },
          params: {
            type: "object",
            properties: {
              transaction_id: {
                type: "string",
                description:
                  "The reference transaction ID associated with a payment activity",
              },
              amount: { type: "string" },
              currency: { type: "string" },
              bank_code: { type: "string" },
              bank_account_number: { type: "string" },
              virtual_payment_address: { type: "string" },
              source_bank_code: { type: "string" },
              source_bank_account_number: { type: "string" },
              source_virtual_payment_address: { type: "string" },
            },
          },
          type: {
            type: "string",
            enum: [
              "PRE-ORDER",
              "PRE-FULFILLMENT",
              "ON-FULFILLMENT",
              "POST-FULFILLMENT",
            ],
          },
          status: { type: "string", enum: ["PAID", "NOT-PAID"] },
          time: { $ref: "#/components/schemas/Time" },
          tags: {
            type: "array",
            items: { $ref: "#/components/schemas/TagGroup" },
          },
        },
      },
      Person: {
        description: "Describes a person as any individual",
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Describes the identity of the person",
          },
          url: {
            description: "Profile url of the person",
            type: "string",
            format: "uri",
          },
          name: { description: "the name of the person", type: "string" },
          image: { $ref: "#/components/schemas/Image" },
          age: {
            description: "Age of the person",
            allOf: [{ $ref: "#/components/schemas/Duration" }],
          },
          dob: {
            description: "Date of birth of the person",
            type: "string",
            format: "date",
          },
          gender: {
            type: "string",
            description:
              "Gender of something, typically a Person, but possibly also fictional characters, animals, etc. While Male and Female may be used, text strings are also acceptable for people who do not identify as a binary gender.Allowed values for this field can be published in the network policy",
          },
          creds: {
            type: "array",
            items: { $ref: "#/components/schemas/Credential" },
          },
          languages: {
            type: "array",
            items: {
              description: "Describes a language known to the person.",
              type: "object",
              properties: {
                code: { type: "string" },
                name: { type: "string" },
              },
            },
          },
          skills: {
            type: "array",
            items: {
              description: "Describes a skill of the person.",
              type: "object",
              properties: {
                code: { type: "string" },
                name: { type: "string" },
              },
            },
          },
          tags: {
            type: "array",
            items: { $ref: "#/components/schemas/TagGroup" },
          },
        },
      },
      Price: {
        description: "Describes the price of a product or service",
        type: "object",
        properties: {
          currency: { type: "string" },
          value: { $ref: "#/components/schemas/DecimalValue" },
          estimated_value: { $ref: "#/components/schemas/DecimalValue" },
          computed_value: { $ref: "#/components/schemas/DecimalValue" },
          listed_value: { $ref: "#/components/schemas/DecimalValue" },
          offered_value: { $ref: "#/components/schemas/DecimalValue" },
          minimum_value: { $ref: "#/components/schemas/DecimalValue" },
          maximum_value: { $ref: "#/components/schemas/DecimalValue" },
        },
      },
      Provider: {
        description: "Describes the catalog of a business.",
        type: "object",
        properties: {
          id: { type: "string", description: "Id of the provider" },
          descriptor: { $ref: "#/components/schemas/Descriptor" },
          category_id: {
            type: "string",
            description: "Category Id of the provider at the BPP-level catalog",
          },
          rating: { $ref: "#/components/schemas/Rating/properties/value" },
          time: { $ref: "#/components/schemas/Time" },
          categories: {
            type: "array",
            items: { $ref: "#/components/schemas/Category" },
          },
          fulfillments: {
            type: "array",
            items: { $ref: "#/components/schemas/Fulfillment" },
          },
          payments: {
            type: "array",
            items: { $ref: "#/components/schemas/Payment" },
          },
          locations: {
            type: "array",
            items: { $ref: "#/components/schemas/Location" },
          },
          offers: {
            type: "array",
            items: { $ref: "#/components/schemas/Offer" },
          },
          items: {
            type: "array",
            items: { $ref: "#/components/schemas/Item" },
          },
          exp: {
            type: "string",
            description: "Time after which catalog has to be refreshed",
            format: "date-time",
          },
          rateable: {
            description: "Whether this provider can be rated or not",
            type: "boolean",
          },
          ttl: {
            description:
              "The time-to-live in seconds, for this object. This can be overriden at deeper levels. A value of -1 indicates that this object is not cacheable.",
            type: "integer",
            minimum: -1,
          },
          tags: {
            type: "array",
            items: { $ref: "#/components/schemas/TagGroup" },
          },
        },
      },
      Quotation: {
        description:
          "Describes a quote. It is the estimated price of products or services from the BPP.<br>This has properties like price, breakup, ttl",
        type: "object",
        properties: {
          id: {
            description: "ID of the quote.",
            type: "string",
            format: "uuid",
          },
          price: {
            description: "The total quoted price",
            allOf: [{ $ref: "#/components/schemas/Price" }],
          },
          breakup: {
            description: "the breakup of the total quoted price",
            type: "array",
            items: {
              type: "object",
              properties: {
                item: { $ref: "#/components/schemas/Item" },
                title: { type: "string" },
                price: { $ref: "#/components/schemas/Price" },
              },
            },
          },
          ttl: { $ref: "#/components/schemas/Duration" },
        },
      },
      Rating: {
        description: "Describes the rating of an entity",
        type: "object",
        properties: {
          rating_category: {
            description: "Category of the entity being rated",
            type: "string",
            enum: [
              "Item",
              "Order",
              "Fulfillment",
              "Provider",
              "Agent",
              "Support",
            ],
          },
          id: { description: "Id of the object being rated", type: "string" },
          value: {
            description:
              "Rating value given to the object. This can be a single value or can also contain an inequality operator like gt, gte, lt, lte. This can also contain an inequality expression containing logical operators like && and ||.",
            type: "string",
          },
        },
      },
      Region: {
        description:
          "Describes an arbitrary region of space. The network policy should contain a published list of supported regions by the network.",
        type: "object",
        properties: {
          dimensions: {
            description:
              "The number of dimensions that are used to describe any point inside that region. The most common dimensionality of a region is 2, that represents an area on a map. There are regions on the map that can be approximated to one-dimensional regions like roads, railway lines, or shipping lines. 3 dimensional regions are rarer, but are gaining popularity as flying drones are being adopted for various fulfillment services.",
            type: "string",
            enum: ["1", "2", "3"],
          },
          type: {
            description:
              "The type of region. This is used to specify the granularity of the region represented by this object. Various examples of two-dimensional region types are city, country, state, district, and so on. The network policy should contain a list of all possible region types supported by the network.",
            type: "string",
          },
          name: {
            type: "string",
            description:
              "Name of the region as specified on the map where that region exists.",
          },
          code: {
            type: "string",
            description:
              "A standard code representing the region. This should be interpreted in the same way by all network participants.",
          },
          boundary: {
            type: "string",
            description:
              "A string representing the boundary of the region. One-dimensional regions are represented by polylines. Two-dimensional regions are represented by polygons, and three-dimensional regions can represented by polyhedra.",
          },
          map_url: {
            type: "string",
            description:
              "The url to the map of the region. This can be a globally recognized map or the one specified by the network policy.",
          },
        },
      },
      ReplacementTerm: {
        description: "The replacement policy of an item or an order",
        type: "object",
        properties: {
          fulfillment_state: {
            description:
              "The state of fulfillment during which this term is applicable.",
            allOf: [{ $ref: "#/components/schemas/State" }],
          },
          replace_within: {
            description:
              "Applicable only for buyer managed returns where the buyer has to replace the item before a certain date-time, failing which they will not be eligible for replacement",
            allOf: [{ $ref: "#/components/schemas/Time" }],
          },
          external_ref: { $ref: "#/components/schemas/MediaFile" },
        },
      },
      ReturnTerm: {
        description: "Describes the return policy of an item or an order",
        type: "object",
        properties: {
          fulfillment_state: {
            description:
              "The state of fulfillment during which this term IETF''s applicable.",
            allOf: [{ $ref: "#/components/schemas/State" }],
          },
          return_eligible: {
            description: "Indicates whether the item is eligible for return",
            type: "boolean",
          },
          return_time: {
            description:
              "Applicable only for buyer managed returns where the buyer has to return the item to the origin before a certain date-time, failing which they will not be eligible for refund.",
            allOf: [{ $ref: "#/components/schemas/Time" }],
          },
          return_location: {
            description:
              "The location where the item or order must / will be returned to",
            allOf: [{ $ref: "#/components/schemas/Location" }],
          },
          fulfillment_managed_by: {
            description: "The entity that will perform the return",
            type: "string",
            enum: ["CONSUMER", "PROVIDER"],
          },
        },
      },
      Scalar: {
        description: "Describes a scalar",
        type: "object",
        properties: {
          type: { type: "string", enum: ["CONSTANT", "VARIABLE"] },
          value: { $ref: "#/components/schemas/DecimalValue" },
          estimated_value: { $ref: "#/components/schemas/DecimalValue" },
          computed_value: { $ref: "#/components/schemas/DecimalValue" },
          range: {
            type: "object",
            properties: {
              min: { $ref: "#/components/schemas/DecimalValue" },
              max: { $ref: "#/components/schemas/DecimalValue" },
            },
          },
          unit: { type: "string" },
        },
      },
      Schedule: {
        description:
          "Describes schedule as a repeating time period used to describe a regularly recurring event. At a minimum a schedule will specify frequency which describes the interval between occurrences of the event. Additional information can be provided to specify the schedule more precisely. This includes identifying the timestamps(s) of when the event will take place. Schedules may also have holidays to exclude a specific day from the schedule.<br>This has properties like frequency, holidays, times",
        type: "object",
        properties: {
          frequency: { $ref: "#/components/schemas/Duration" },
          holidays: {
            type: "array",
            items: { type: "string", format: "date-time" },
          },
          times: {
            type: "array",
            items: { type: "string", format: "date-time" },
          },
        },
      },
      State: {
        description:
          "A bounded geopolitical region of governance inside a country.",
        type: "object",
        properties: {
          name: { type: "string", description: "Name of the state" },
          code: {
            type: "string",
            description: "State code as per country or international standards",
          },
        },
      },
      Stop: {
        description:
          "A logical point in space and time during the fulfillment of an order.",
        type: "object",
        properties: {
          id: { type: "string" },
          parent_stop_id: { type: "string" },
          location: {
            description: "Location of the stop",
            allOf: [{ $ref: "#/components/schemas/Location" }],
          },
          type: {
            description:
              "The type of stop. Allowed values of this property can be defined by the network policy.",
            type: "string",
          },
          time: {
            description: "Timings applicable at the stop.",
            allOf: [{ $ref: "#/components/schemas/Time" }],
          },
          instructions: {
            description: "Instructions that need to be followed at the stop",
            allOf: [{ $ref: "#/components/schemas/Descriptor" }],
          },
          contact: {
            description: "Contact details of the stop",
            allOf: [{ $ref: "#/components/schemas/Contact" }],
          },
          person: {
            description: "The details of the person present at the stop",
            allOf: [{ $ref: "#/components/schemas/Person" }],
          },
          authorization: { $ref: "#/components/schemas/Authorization" },
        },
      },
      Support: {
        description: "Details of customer support",
        type: "object",
        properties: {
          ref_id: { type: "string" },
          callback_phone: { type: "string", format: "phone" },
          phone: { type: "string", format: "phone" },
          email: { type: "string", format: "email" },
          url: { type: "string", format: "uri" },
        },
      },
      Tag: {
        description:
          "Describes a tag. This is used to contain extended metadata. This object can be added as a property to any schema to describe extended attributes. For BAPs, tags can be sent during search to optimize and filter search results. BPPs can use tags to index their catalog to allow better search functionality. Tags are sent by the BPP as part of the catalog response in the `on_search` callback. Tags are also meant for display purposes. Upon receiving a tag, BAPs are meant to render them as name-value pairs. This is particularly useful when rendering tabular information about a product or service.",
        type: "object",
        properties: {
          descriptor: {
            description:
              "Description of the Tag, can be used to store detailed information.",
            allOf: [{ $ref: "#/components/schemas/Descriptor" }],
          },
          value: {
            description:
              "The value of the tag. This set by the BPP and rendered as-is by the BAP.",
            type: "string",
          },
          display: {
            description:
              "This value indicates if the tag is intended for display purposes. If set to `true`, then this tag must be displayed. If it is set to `false`, it should not be displayed. This value can override the group display value.",
            type: "boolean",
          },
        },
      },
      TagGroup: {
        description:
          "A collection of tag objects with group level attributes. For detailed documentation on the Tags and Tag Groups schema go to https://github.com/beckn/protocol-specifications/discussions/316",
        type: "object",
        properties: {
          display: {
            description:
              "Indicates the display properties of the tag group. If display is set to false, then the group will not be displayed. If it is set to true, it should be displayed. However, group-level display properties can be overriden by individual tag-level display property. As this schema is purely for catalog display purposes, it is not recommended to send this value during search.",
            type: "boolean",
            default: true,
          },
          descriptor: {
            description:
              "Description of the TagGroup, can be used to store detailed information.",
            allOf: [{ $ref: "#/components/schemas/Descriptor" }],
          },
          list: {
            description:
              "An array of Tag objects listed under this group. This property can be set by BAPs during search to narrow the `search` and achieve more relevant results. When received during `on_search`, BAPs must render this list under the heading described by the `name` property of this schema.",
            type: "array",
            items: { $ref: "#/components/schemas/Tag" },
          },
        },
      },
      Time: {
        description:
          "Describes time in its various forms. It can be a single point in time; duration; or a structured timetable of operations<br>This has properties like label, time stamp,duration,range, days, schedule",
        type: "object",
        properties: {
          label: { type: "string" },
          timestamp: { type: "string", format: "date-time" },
          duration: { $ref: "#/components/schemas/Duration" },
          range: {
            type: "object",
            properties: {
              start: { type: "string", format: "date-time" },
              end: { type: "string", format: "date-time" },
            },
          },
          days: {
            type: "string",
            description: "comma separated values representing days of the week",
          },
          schedule: { $ref: "#/components/schemas/Schedule" },
        },
      },
      Tracking: {
        description:
          "Contains tracking information that can be used by the BAP to track the fulfillment of an order in real-time. which is useful for knowing the location of time sensitive deliveries.",
        type: "object",
        properties: {
          id: {
            description: "A unique tracking reference number",
            type: "string",
          },
          url: {
            description:
              "A URL to the tracking endpoint. This can be a link to a tracking webpage, a webhook URL created by the BAP where BPP can push the tracking data, or a GET url creaed by the BPP which the BAP can poll to get the tracking data. It can also be a websocket URL where the BPP can push real-time tracking data.",
            type: "string",
            format: "uri",
          },
          location: {
            description:
              "In case there is no real-time tracking endpoint available, this field will contain the latest location of the entity being tracked. The BPP will update this value everytime the BAP calls the track API.",
            allOf: [{ $ref: "#/components/schemas/Location" }],
          },
          status: {
            description:
              "This value indicates if the tracking is currently active or not. If this value is `active`, then the BAP can begin tracking the order. If this value is `inactive`, the tracking URL is considered to be expired and the BAP should stop tracking the order.",
            type: "string",
            enum: ["active", "inactive"],
          },
        },
      },
      Vehicle: {
        description:
          "Describes a vehicle is a device that is designed or used to transport people or cargo over land, water, air, or through space.<br>This has properties like category, capacity, make, model, size,variant,color,energy_type,registration",
        type: "object",
        properties: {
          category: { type: "string" },
          capacity: { type: "integer" },
          make: { type: "string" },
          model: { type: "string" },
          size: { type: "string" },
          variant: { type: "string" },
          color: { type: "string" },
          energy_type: { type: "string" },
          registration: { type: "string" },
          wheels_count: { type: "string" },
          cargo_volumne: { type: "string" },
          wheelchair_access: { type: "string" },
          code: { type: "string" },
          emission_standard: { type: "string" },
        },
      },
      XInput: {
        description:
          "Contains any additional or extended inputs required to confirm an order. This is typically a Form Input. Sometimes, selection of catalog elements is not enough for the BPP to confirm an order. For example, to confirm a flight ticket, the airline requires details of the passengers along with information on baggage, identity, in addition to the class of ticket. Similarly, a logistics company may require details on the nature of shipment in order to confirm the shipping. A recruiting firm may require additional details on the applicant in order to confirm a job application. For all such purposes, the BPP can choose to send this object attached to any object in the catalog that is required to be sent while placing the order. This object can typically be sent at an item level or at the order level. The item level XInput will override the Order level XInput as it indicates a special requirement of information for that particular item. Hence the BAP must render a separate form for the Item and another form at the Order level before confirmation.",
        type: "object",
        properties: {
          form: { $ref: "#/components/schemas/Form" },
          required: {
            description:
              "Indicates whether the form data is mandatorily required by the BPP to confirm the order.",
            type: "boolean",
          },
        },
      },
    },
  },
  "x-enum": {
    search: {
      context: {
        location: {
          country: {
            code: [
              {
                code: "IND",
                description: "Represents the country",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
          city: {
            code: [
              {
                code: "std:080",
                description: "Bangalore",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
        },
        domain: [
          {
            code: "ONDC:FIS12",
            description: "Loan",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
        ],
        action: [
          {
            code: "search",
            description: "buyer app specifies the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_search",
            description:
              "seller app responds with the catalog based on the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "select",
            description:
              "buyer app specifies the items & quantity selected by a buyer",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_select",
            description:
              "seller app responds with the serviceability info, quote & O2D TAT for selected items;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "confirm",
            description: "buyer app places the order on behalf of the buyer;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_confirm",
            description:
              "seller app responds to the order placed either through auto-acceptance or deferred acceptance or rejection of the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "update",
            description: "updates in the serviceable loc happens here",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_update",
            description: "seller app responds with serviceable",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "cancel",
            description: "Cancellation of ride",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_cancel",
            description: "Specifiy the cancellation of the state",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "track",
            description: "Track the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_track",
            description: "Return tracking infomation of the order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "status",
            description: "Request for status of the vehicle",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_status",
            description:
              "Return order with status , Driver pickup - driver drop",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "support",
            description:
              "Fetch support information related to a particular order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_support",
            description: "Return support information related to order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
        ],
      },
    },
    on_search: {
      context: {
        location: {
          country: {
            code: [
              {
                code: "IND",
                description: "Represents the country",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
          city: {
            code: [
              {
                code: "std:080",
                description: "Bangalore",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
        },
        domain: [
          {
            code: "ONDC:FIS12",
            description: "Loan",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
        ],
        action: [
          {
            code: "search",
            description: "buyer app specifies the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_search",
            description:
              "seller app responds with the catalog based on the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "select",
            description:
              "buyer app specifies the items & quantity selected by a buyer",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_select",
            description:
              "seller app responds with the serviceability info, quote & O2D TAT for selected items;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "confirm",
            description: "buyer app places the order on behalf of the buyer;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_confirm",
            description:
              "seller app responds to the order placed either through auto-acceptance or deferred acceptance or rejection of the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "update",
            description: "updates in the serviceable loc happens here",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_update",
            description: "seller app responds with serviceable",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "cancel",
            description: "Cancellation of ride",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_cancel",
            description: "Specifiy the cancellation of the state",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "track",
            description: "Track the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_track",
            description: "Return tracking infomation of the order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "status",
            description: "Request for status of the vehicle",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_status",
            description:
              "Return order with status , Driver pickup - driver drop",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "support",
            description:
              "Fetch support information related to a particular order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_support",
            description: "Return support information related to order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
        ],
      },
    },
    select: {
      context: {
        location: {
          country: {
            code: [
              {
                code: "IND",
                description: "Represents the country",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
          city: {
            code: [
              {
                code: "std:080",
                description: "Bangalore",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
        },
        domain: [
          {
            code: "ONDC:FIS12",
            description: "Loan",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
        ],
        action: [
          {
            code: "search",
            description: "buyer app specifies the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_search",
            description:
              "seller app responds with the catalog based on the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "select",
            description:
              "buyer app specifies the items & quantity selected by a buyer",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_select",
            description:
              "seller app responds with the serviceability info, quote & O2D TAT for selected items;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "confirm",
            description: "buyer app places the order on behalf of the buyer;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_confirm",
            description:
              "seller app responds to the order placed either through auto-acceptance or deferred acceptance or rejection of the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "update",
            description: "updates in the serviceable loc happens here",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_update",
            description: "seller app responds with serviceable",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "cancel",
            description: "Cancellation of ride",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_cancel",
            description: "Specifiy the cancellation of the state",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "track",
            description: "Track the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_track",
            description: "Return tracking infomation of the order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "status",
            description: "Request for status of the vehicle",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_status",
            description:
              "Return order with status , Driver pickup - driver drop",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "support",
            description:
              "Fetch support information related to a particular order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_support",
            description: "Return support information related to order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
        ],
      },
    },
    on_select: {
      context: {
        location: {
          country: {
            code: [
              {
                code: "IND",
                description: "Represents the country",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
          city: {
            code: [
              {
                code: "std:080",
                description: "Bangalore",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
        },
        domain: [
          {
            code: "ONDC:FIS12",
            description: "Loan",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
        ],
        action: [
          {
            code: "search",
            description: "buyer app specifies the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_search",
            description:
              "seller app responds with the catalog based on the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "select",
            description:
              "buyer app specifies the items & quantity selected by a buyer",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_select",
            description:
              "seller app responds with the serviceability info, quote & O2D TAT for selected items;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "confirm",
            description: "buyer app places the order on behalf of the buyer;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_confirm",
            description:
              "seller app responds to the order placed either through auto-acceptance or deferred acceptance or rejection of the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "update",
            description: "updates in the serviceable loc happens here",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_update",
            description: "seller app responds with serviceable",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "cancel",
            description: "Cancellation of ride",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_cancel",
            description: "Specifiy the cancellation of the state",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "track",
            description: "Track the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_track",
            description: "Return tracking infomation of the order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "status",
            description: "Request for status of the vehicle",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_status",
            description:
              "Return order with status , Driver pickup - driver drop",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "support",
            description:
              "Fetch support information related to a particular order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_support",
            description: "Return support information related to order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
        ],
      },
    },
    init: {
      context: {
        location: {
          country: {
            code: [
              {
                code: "IND",
                description: "Represents the country",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
          city: {
            code: [
              {
                code: "std:080",
                description: "Bangalore",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
        },
        domain: [
          {
            code: "ONDC:FIS12",
            description: "Loan",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
        ],
        action: [
          {
            code: "search",
            description: "buyer app specifies the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_search",
            description:
              "seller app responds with the catalog based on the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "select",
            description:
              "buyer app specifies the items & quantity selected by a buyer",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_select",
            description:
              "seller app responds with the serviceability info, quote & O2D TAT for selected items;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "confirm",
            description: "buyer app places the order on behalf of the buyer;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_confirm",
            description:
              "seller app responds to the order placed either through auto-acceptance or deferred acceptance or rejection of the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "update",
            description: "updates in the serviceable loc happens here",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_update",
            description: "seller app responds with serviceable",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "cancel",
            description: "Cancellation of ride",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_cancel",
            description: "Specifiy the cancellation of the state",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "track",
            description: "Track the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_track",
            description: "Return tracking infomation of the order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "status",
            description: "Request for status of the vehicle",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_status",
            description:
              "Return order with status , Driver pickup - driver drop",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "support",
            description:
              "Fetch support information related to a particular order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_support",
            description: "Return support information related to order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
        ],
      },
    },
    on_init: {
      context: {
        location: {
          country: {
            code: [
              {
                code: "IND",
                description: "Represents the country",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
          city: {
            code: [
              {
                code: "std:080",
                description: "Bangalore",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
        },
        domain: [
          {
            code: "ONDC:FIS12",
            description: "Loan",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
        ],
        action: [
          {
            code: "search",
            description: "buyer app specifies the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_search",
            description:
              "seller app responds with the catalog based on the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "select",
            description:
              "buyer app specifies the items & quantity selected by a buyer",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_select",
            description:
              "seller app responds with the serviceability info, quote & O2D TAT for selected items;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "confirm",
            description: "buyer app places the order on behalf of the buyer;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_confirm",
            description:
              "seller app responds to the order placed either through auto-acceptance or deferred acceptance or rejection of the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "update",
            description: "updates in the serviceable loc happens here",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_update",
            description: "seller app responds with serviceable",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "cancel",
            description: "Cancellation of ride",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_cancel",
            description: "Specifiy the cancellation of the state",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "track",
            description: "Track the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_track",
            description: "Return tracking infomation of the order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "status",
            description: "Request for status of the vehicle",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_status",
            description:
              "Return order with status , Driver pickup - driver drop",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "support",
            description:
              "Fetch support information related to a particular order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_support",
            description: "Return support information related to order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
        ],
      },
    },
    confirm: {
      context: {
        location: {
          country: {
            code: [
              {
                code: "IND",
                description: "Represents the country",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
          city: {
            code: [
              {
                code: "std:080",
                description: "Bangalore",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
        },
        domain: [
          {
            code: "ONDC:FIS12",
            description: "Loan",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
        ],
        action: [
          {
            code: "search",
            description: "buyer app specifies the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_search",
            description:
              "seller app responds with the catalog based on the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "select",
            description:
              "buyer app specifies the items & quantity selected by a buyer",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_select",
            description:
              "seller app responds with the serviceability info, quote & O2D TAT for selected items;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "confirm",
            description: "buyer app places the order on behalf of the buyer;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_confirm",
            description:
              "seller app responds to the order placed either through auto-acceptance or deferred acceptance or rejection of the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "update",
            description: "updates in the serviceable loc happens here",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_update",
            description: "seller app responds with serviceable",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "cancel",
            description: "Cancellation of ride",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_cancel",
            description: "Specifiy the cancellation of the state",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "track",
            description: "Track the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_track",
            description: "Return tracking infomation of the order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "status",
            description: "Request for status of the vehicle",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_status",
            description:
              "Return order with status , Driver pickup - driver drop",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "support",
            description:
              "Fetch support information related to a particular order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_support",
            description: "Return support information related to order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
        ],
      },
    },
    on_confirm: {
      context: {
        location: {
          country: {
            code: [
              {
                code: "IND",
                description: "Represents the country",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
          city: {
            code: [
              {
                code: "std:080",
                description: "Bangalore",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
        },
        domain: [
          {
            code: "ONDC:FIS12",
            description: "Loan",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
        ],
        action: [
          {
            code: "search",
            description: "buyer app specifies the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_search",
            description:
              "seller app responds with the catalog based on the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "select",
            description:
              "buyer app specifies the items & quantity selected by a buyer",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_select",
            description:
              "seller app responds with the serviceability info, quote & O2D TAT for selected items;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "confirm",
            description: "buyer app places the order on behalf of the buyer;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_confirm",
            description:
              "seller app responds to the order placed either through auto-acceptance or deferred acceptance or rejection of the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "update",
            description: "updates in the serviceable loc happens here",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_update",
            description: "seller app responds with serviceable",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "cancel",
            description: "Cancellation of ride",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_cancel",
            description: "Specifiy the cancellation of the state",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "track",
            description: "Track the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_track",
            description: "Return tracking infomation of the order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "status",
            description: "Request for status of the vehicle",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_status",
            description:
              "Return order with status , Driver pickup - driver drop",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "support",
            description:
              "Fetch support information related to a particular order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_support",
            description: "Return support information related to order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
        ],
      },
    },
    status: {
      context: {
        location: {
          country: {
            code: [
              {
                code: "IND",
                description: "Represents the country",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
          city: {
            code: [
              {
                code: "std:080",
                description: "Bangalore",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
        },
        domain: [
          {
            code: "ONDC:FIS12",
            description: "Loan",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
        ],
        action: [
          {
            code: "search",
            description: "buyer app specifies the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_search",
            description:
              "seller app responds with the catalog based on the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "select",
            description:
              "buyer app specifies the items & quantity selected by a buyer",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_select",
            description:
              "seller app responds with the serviceability info, quote & O2D TAT for selected items;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "confirm",
            description: "buyer app places the order on behalf of the buyer;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_confirm",
            description:
              "seller app responds to the order placed either through auto-acceptance or deferred acceptance or rejection of the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "update",
            description: "updates in the serviceable loc happens here",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_update",
            description: "seller app responds with serviceable",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "cancel",
            description: "Cancellation of ride",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_cancel",
            description: "Specifiy the cancellation of the state",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "track",
            description: "Track the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_track",
            description: "Return tracking infomation of the order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "status",
            description: "Request for status of the vehicle",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_status",
            description:
              "Return order with status , Driver pickup - driver drop",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "support",
            description:
              "Fetch support information related to a particular order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_support",
            description: "Return support information related to order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
        ],
      },
    },
    on_status: {
      context: {
        location: {
          country: {
            code: [
              {
                code: "IND",
                description: "Represents the country",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
          city: {
            code: [
              {
                code: "std:080",
                description: "Bangalore",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
        },
        domain: [
          {
            code: "ONDC:FIS12",
            description: "Loan",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
        ],
        action: [
          {
            code: "search",
            description: "buyer app specifies the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_search",
            description:
              "seller app responds with the catalog based on the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "select",
            description:
              "buyer app specifies the items & quantity selected by a buyer",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_select",
            description:
              "seller app responds with the serviceability info, quote & O2D TAT for selected items;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "confirm",
            description: "buyer app places the order on behalf of the buyer;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_confirm",
            description:
              "seller app responds to the order placed either through auto-acceptance or deferred acceptance or rejection of the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "update",
            description: "updates in the serviceable loc happens here",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_update",
            description: "seller app responds with serviceable",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "cancel",
            description: "Cancellation of ride",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_cancel",
            description: "Specifiy the cancellation of the state",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "track",
            description: "Track the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_track",
            description: "Return tracking infomation of the order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "status",
            description: "Request for status of the vehicle",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_status",
            description:
              "Return order with status , Driver pickup - driver drop",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "support",
            description:
              "Fetch support information related to a particular order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_support",
            description: "Return support information related to order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
        ],
      },
    },
    cancel: {
      context: {
        location: {
          country: {
            code: [
              {
                code: "IND",
                description: "Represents the country",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
          city: {
            code: [
              {
                code: "std:080",
                description: "Bangalore",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
        },
        domain: [
          {
            code: "ONDC:FIS12",
            description: "Loan",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
        ],
        action: [
          {
            code: "search",
            description: "buyer app specifies the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_search",
            description:
              "seller app responds with the catalog based on the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "select",
            description:
              "buyer app specifies the items & quantity selected by a buyer",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_select",
            description:
              "seller app responds with the serviceability info, quote & O2D TAT for selected items;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "confirm",
            description: "buyer app places the order on behalf of the buyer;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_confirm",
            description:
              "seller app responds to the order placed either through auto-acceptance or deferred acceptance or rejection of the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "update",
            description: "updates in the serviceable loc happens here",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_update",
            description: "seller app responds with serviceable",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "cancel",
            description: "Cancellation of ride",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_cancel",
            description: "Specifiy the cancellation of the state",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "track",
            description: "Track the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_track",
            description: "Return tracking infomation of the order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "status",
            description: "Request for status of the vehicle",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_status",
            description:
              "Return order with status , Driver pickup - driver drop",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "support",
            description:
              "Fetch support information related to a particular order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_support",
            description: "Return support information related to order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
        ],
      },
    },
    on_cancel: {
      context: {
        location: {
          country: {
            code: [
              {
                code: "IND",
                description: "Represents the country",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
          city: {
            code: [
              {
                code: "std:080",
                description: "Bangalore",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
        },
        domain: [
          {
            code: "ONDC:FIS12",
            description: "Loan",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
        ],
        action: [
          {
            code: "search",
            description: "buyer app specifies the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_search",
            description:
              "seller app responds with the catalog based on the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "select",
            description:
              "buyer app specifies the items & quantity selected by a buyer",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_select",
            description:
              "seller app responds with the serviceability info, quote & O2D TAT for selected items;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "confirm",
            description: "buyer app places the order on behalf of the buyer;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_confirm",
            description:
              "seller app responds to the order placed either through auto-acceptance or deferred acceptance or rejection of the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "update",
            description: "updates in the serviceable loc happens here",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_update",
            description: "seller app responds with serviceable",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "cancel",
            description: "Cancellation of ride",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_cancel",
            description: "Specifiy the cancellation of the state",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "track",
            description: "Track the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_track",
            description: "Return tracking infomation of the order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "status",
            description: "Request for status of the vehicle",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_status",
            description:
              "Return order with status , Driver pickup - driver drop",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "support",
            description:
              "Fetch support information related to a particular order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_support",
            description: "Return support information related to order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
        ],
      },
    },
    track: {
      context: {
        location: {
          country: {
            code: [
              {
                code: "IND",
                description: "Represents the country",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
          city: {
            code: [
              {
                code: "std:080",
                description: "Bangalore",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
        },
        domain: [
          {
            code: "ONDC:FIS12",
            description: "Loan",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
        ],
        action: [
          {
            code: "search",
            description: "buyer app specifies the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_search",
            description:
              "seller app responds with the catalog based on the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "select",
            description:
              "buyer app specifies the items & quantity selected by a buyer",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_select",
            description:
              "seller app responds with the serviceability info, quote & O2D TAT for selected items;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "confirm",
            description: "buyer app places the order on behalf of the buyer;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_confirm",
            description:
              "seller app responds to the order placed either through auto-acceptance or deferred acceptance or rejection of the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "update",
            description: "updates in the serviceable loc happens here",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_update",
            description: "seller app responds with serviceable",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "cancel",
            description: "Cancellation of ride",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_cancel",
            description: "Specifiy the cancellation of the state",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "track",
            description: "Track the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_track",
            description: "Return tracking infomation of the order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "status",
            description: "Request for status of the vehicle",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_status",
            description:
              "Return order with status , Driver pickup - driver drop",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "support",
            description:
              "Fetch support information related to a particular order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_support",
            description: "Return support information related to order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
        ],
      },
    },
    on_track: {
      context: {
        location: {
          country: {
            code: [
              {
                code: "IND",
                description: "Represents the country",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
          city: {
            code: [
              {
                code: "std:080",
                description: "Bangalore",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
        },
        domain: [
          {
            code: "ONDC:FIS12",
            description: "Loan",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
        ],
        action: [
          {
            code: "search",
            description: "buyer app specifies the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_search",
            description:
              "seller app responds with the catalog based on the search intent",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "select",
            description:
              "buyer app specifies the items & quantity selected by a buyer",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_select",
            description:
              "seller app responds with the serviceability info, quote & O2D TAT for selected items;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_init",
            description:
              "buyer & seller app specify & agree to the terms & conditions prior to placing the order;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "confirm",
            description: "buyer app places the order on behalf of the buyer;",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_confirm",
            description:
              "seller app responds to the order placed either through auto-acceptance or deferred acceptance or rejection of the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "update",
            description: "updates in the serviceable loc happens here",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_update",
            description: "seller app responds with serviceable",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "cancel",
            description: "Cancellation of ride",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_cancel",
            description: "Specifiy the cancellation of the state",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "track",
            description: "Track the order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_track",
            description: "Return tracking infomation of the order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
          {
            code: "status",
            description: "Request for status of the vehicle",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_status",
            description:
              "Return order with status , Driver pickup - driver drop",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "support",
            description:
              "Fetch support information related to a particular order",
            reference: "<PR/Issue/Discussion Links md format text>",
          },
          {
            code: "on_support",
            description: "Return support information related to order",
            reference: "<PR/Issue/Discussion Links md format text",
          },
        ],
      },
    },
  },
  "x-tags": {
    search: {
      message: {
        intent: {
          fulfillment: {
            customer: {
              person: {
                tags: [
                  {
                    code: "localization",
                    description: "follow ISO 639-1 codes",
                    reference: "<PR/Issue/Discussion Links md format text>",
                    list: [
                      {
                        code: "lang",
                        description: "follow ISO 639-1 codes",
                        reference: "<PR/Issue/Discussion Links md format text>",
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },
    on_search: {
      message: {
        catalog: {
          providers: {
            fulfillments: {
              customer: {
                person: {
                  tags: [
                    {
                      code: "localization",
                      description: "follow ISO 639-1 codes",
                      reference: "<PR/Issue/Discussion Links md format text>",
                      list: [
                        {
                          code: "lang",
                          description: "follow ISO 639-1 codes",
                          reference:
                            "<PR/Issue/Discussion Links md format text>",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    select: {
      message: {
        order: {
          fulfillments: {
            customer: {
              person: {
                tags: [
                  {
                    code: "localization",
                    description: "follow ISO 639-1 codes",
                    reference: "<PR/Issue/Discussion Links md format text>",
                    list: [
                      {
                        code: "lang",
                        description: "follow ISO 639-1 codes",
                        reference: "<PR/Issue/Discussion Links md format text>",
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },
    on_select: {
      message: {
        order: {
          fulfillments: {
            customer: {
              person: {
                tags: [
                  {
                    code: "localization",
                    description: "follow ISO 639-1 codes",
                    reference: "<PR/Issue/Discussion Links md format text>",
                    list: [
                      {
                        code: "lang",
                        description: "follow ISO 639-1 codes",
                        reference: "<PR/Issue/Discussion Links md format text>",
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },
    init: {
      message: {
        order: {
          fulfillments: {
            customer: {
              person: {
                tags: [
                  {
                    code: "localization",
                    description: "follow ISO 639-1 codes",
                    reference: "<PR/Issue/Discussion Links md format text>",
                    list: [
                      {
                        code: "lang",
                        description: "follow ISO 639-1 codes",
                        reference: "<PR/Issue/Discussion Links md format text>",
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },
    on_init: {
      message: {
        order: {
          fulfillments: {
            customer: {
              person: {
                tags: [
                  {
                    code: "localization",
                    description: "follow ISO 639-1 codes",
                    reference: "<PR/Issue/Discussion Links md format text>",
                    list: [
                      {
                        code: "lang",
                        description: "follow ISO 639-1 codes",
                        reference: "<PR/Issue/Discussion Links md format text>",
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },
    confirm: {
      message: {
        order: {
          fulfillments: {
            customer: {
              person: {
                tags: [
                  {
                    code: "localization",
                    description: "follow ISO 639-1 codes",
                    reference: "<PR/Issue/Discussion Links md format text>",
                    list: [
                      {
                        code: "lang",
                        description: "follow ISO 639-1 codes",
                        reference: "<PR/Issue/Discussion Links md format text>",
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },
    on_confirm: {
      message: {
        order: {
          fulfillments: {
            customer: {
              person: {
                tags: [
                  {
                    code: "localization",
                    description: "follow ISO 639-1 codes",
                    reference: "<PR/Issue/Discussion Links md format text>",
                    list: [
                      {
                        code: "lang",
                        description: "follow ISO 639-1 codes",
                        reference: "<PR/Issue/Discussion Links md format text>",
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },
    on_status: {
      message: {
        order: {
          fulfillments: {
            customer: {
              person: {
                tags: [
                  {
                    code: "localization",
                    description: "follow ISO 639-1 codes",
                    reference: "<PR/Issue/Discussion Links md format text>",
                    list: [
                      {
                        code: "lang",
                        description: "follow ISO 639-1 codes",
                        reference: "<PR/Issue/Discussion Links md format text>",
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },
    on_cancel: {
      message: {
        order: {
          fulfillments: {
            customer: {
              person: {
                tags: [
                  {
                    code: "localization",
                    description: "follow ISO 639-1 codes",
                    reference: "<PR/Issue/Discussion Links md format text>",
                    list: [
                      {
                        code: "lang",
                        description: "follow ISO 639-1 codes",
                        reference: "<PR/Issue/Discussion Links md format text>",
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },
    on_update: {
      message: {
        order: {
          fulfillments: {
            customer: {
              person: {
                tags: [
                  {
                    code: "localization",
                    description: "follow ISO 639-1 codes",
                    reference: "<PR/Issue/Discussion Links md format text>",
                    list: [
                      {
                        code: "lang",
                        description: "follow ISO 639-1 codes",
                        reference: "<PR/Issue/Discussion Links md format text>",
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
  "x-flows": [
    {
      summary: "Personal Loan",
      details: [
        {
          description:
            "A detailed process for obtaining a personal loan from a provider, including the necessary forms and status updates.",
        },
      ],
      references: "if any",
      steps: [
        {
          summary: "Users search for available personal loan services.",
          api: "search",
          details: [
            {
              description:
                "Users explore loan options by searching for personal loan services over the network",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                action: "search",
                timestamp: "2023-05-25T05:23:03.443Z",
                version: "1.1.0",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bap_id: "credit-protocol.becknprotocol.io",
                ttl: "PT10M",
              },
              message: {
                intent: { category: { descriptor: { code: "personal-loan" } } },
              },
            },
          },
        },
        {
          summary:
            "The provider offers a catalog of loan types, including personal loans.",
          api: "on_search",
          details: [
            {
              description:
                "The provider platform provides a comprehensive catalog of various loan types, and one of them is personal loans.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                version: "1.1.0",
                action: "on_search",
                bap_id: "credit-protocol.becknprotocol.io",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                ttl: "PT30M",
                timestamp: "2023-05-25T05:23:03.443Z",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
              },
              message: {
                catalog: {
                  descriptor: { name: "ICICI Bank" },
                  providers: [
                    {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                      categories: [
                        {
                          id: "101123",
                          descriptor: {
                            code: "personal-loan",
                            name: "Personal Loan",
                          },
                        },
                        {
                          id: "101124",
                          descriptor: { code: "car-loan", name: "Car Loan" },
                        },
                        {
                          id: "101125",
                          descriptor: {
                            code: "education-loan",
                            name: "Education Loan",
                          },
                        },
                      ],
                      items: [
                        {
                          id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                          descriptor: {
                            code: "personal-loan",
                            name: "Personal Loan",
                          },
                          category_ids: ["101123"],
                          tags: [
                            {
                              descriptor: {
                                code: "general-info",
                                name: "General Information",
                              },
                              list: [
                                {
                                  descriptor: {
                                    name: "Interest Rate",
                                    short_desc: "Loans starting from 12% (p.a)",
                                  },
                                },
                              ],
                              display: true,
                            },
                          ],
                          matched: true,
                          recommended: true,
                          xinput: {
                            head: {
                              descriptor: { name: "Customer Information" },
                              index: { min: 0, cur: 0, max: 0 },
                              headings: ["Personal Information"],
                            },
                            form: {
                              id: "d097c2f5-cb8d-42fe-900e-dfecdede16fb",
                              mime_type: "text/html",
                              url: "https://6vs8xnx5i7.icicibank.co.in/loans/xinput/formid/a23f2fdfbbb8ac402bf259d75",
                              resubmit: false,
                              multiple_sumbissions: false,
                            },
                            required: true,
                          },
                        },
                        {
                          id: "c8e3968c-cd78-4e46-aa34-0d541e46bd73",
                          descriptor: { code: "car-loan", name: "Car Loan" },
                          category_ids: ["101124"],
                          tags: [
                            {
                              descriptor: { name: "General Information" },
                              list: [
                                {
                                  descriptor: {
                                    name: "Interest Rate",
                                    short_desc: "Loans starting from 9% (p.a)",
                                  },
                                },
                              ],
                              display: true,
                            },
                          ],
                          matched: false,
                          xinput: {
                            head: {
                              descriptor: { name: "Customer Information" },
                              index: { min: 0, cur: 0, max: 0 },
                              headings: ["Personal Information"],
                            },
                            form: {
                              id: "d097c2f5-cb8d-42fe-900e-dfecdede16fb",
                              mime_type: "text/html",
                              url: "https://6vs8xnx5i7.icicibank.co.in/loans/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                              resubmit: false,
                              multiple_sumbissions: false,
                            },
                            required: true,
                          },
                        },
                        {
                          id: "80414936-a06d-49ae-9475-f99448c77014",
                          descriptor: {
                            code: "education-loan",
                            name: "Education Loan",
                          },
                          category_ids: ["101125"],
                          tags: [
                            {
                              descriptor: { name: "General Information" },
                              list: [
                                {
                                  descriptor: {
                                    name: "Interest Rate",
                                    short_desc: "Loans starting from 12% (p.a)",
                                  },
                                },
                              ],
                              display: true,
                            },
                          ],
                          matched: false,
                          xinput: {
                            head: {
                              descriptor: { name: "Customer Information" },
                              index: { min: 0, cur: 0, max: 0 },
                              headings: ["Personal Information"],
                            },
                            form: {
                              id: "d097c2f5-cb8d-42fe-900e-dfecdede16fb",
                              mime_type: "text/html",
                              url: "https://6vs8xnx5i7.icicibank.co.in/loans/xinput/formid/a23f2fdfbbb8ac402bf253fd",
                              resubmit: false,
                              multiple_sumbissions: false,
                            },
                            required: true,
                          },
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "The consumer receives the personal loan application form.",
          api: "form",
          details: {
            description:
              "The provider platform sends the application form for the personal loan to the consumer.",
          },
          reference: "if any",
          example: {
            value:
              '<!DOCTYPE html>\r\n<html lang="en">\r\n<head>\r\n  <meta charset="UTF-8">\r\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\r\n  <title>Document</title>\r\n</head>\r\n<body>\r\n  <form>\r\n    <label for="firstName">First Name</label>\r\n    <input type="text" id="firstName" name="firstName" />\r\n    <label for="lastName">Last Name</label>\r\n    <input type="text" id="lastName" name="lastName" />\r\n    <label for="dob">Date of Birth</label>\r\n    <input type="date" id="dob" name="dob" />\r\n    <label for="sex">Sex</label>\r\n    <select name="sex" id="sex">\r\n      <option value="male">Male</option>\r\n      <option value="female">Female</option>\r\n      <option value="other">Other</option>\r\n    </select>\r\n    <label for="maritalStatus">Marital Status</label>\r\n    <select name="maritalStatus" id="maritalStatus">\r\n      <option value="single">Single</option>\r\n      <option value="married">Married</option>\r\n    </select>\r\n    <label for="occupation">Occupation</label>\r\n    <input type="text" id="occupation" name="occupation" />\r\n    <label for="address">Address</label>\r\n    <input type="text" id="address" name="address" />\r\n  </form>\r\n</body>\r\n</html>',
          },
        },
        {
          summary: "The consumer chooses the personal loan service.",
          api: "select",
          details: [
            {
              description:
                "The consumer selects the specific personal loan service they are interested in.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                action: "select",
                timestamp: "2023-05-25T05:23:03.443Z",
                version: "1.1.0",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bap_id: "credit-protocol.becknprotocol.io",
                ttl: "PT10M",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
              },
              message: {
                order: {
                  provider: { id: "1" },
                  items: [
                    {
                      id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                      xinput: {
                        form_response: {
                          status: true,
                          submission_id: "73ef9742-c17d-4c4e-92e3-b057960863af",
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary:
            "The provider offers the required form for the chosen personal loan service.",
          api: "on_select",
          details: [
            {
              description:
                "The provider platform responds with detailed information and the necessary application form for the selected personal loan service.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                action: "on_select",
                version: "1.1.0",
                bap_id: "credit-protocol.becknprotocol.io",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62195",
                message_id: "c8e3968c-cd78-4e46-aa34-0d541e46bd73",
                timestamp: "2023-05-25T05:23:03.443Z",
                ttl: "P30M",
              },
              message: {
                order: {
                  provider: {
                    id: "1",
                    descriptor: {
                      images: [
                        {
                          url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                          size_type: "sm",
                        },
                      ],
                      name: "ICICI Bank",
                      short_desc: "ICICI Bank Ltd",
                      long_desc: "ICICI Bank Ltd, India.",
                    },
                  },
                  items: [
                    {
                      id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                      descriptor: {
                        code: "personal-loan",
                        name: "Personal Loan",
                      },
                      tags: [
                        {
                          descriptor: {
                            code: "general-info",
                            name: "General Information",
                          },
                          list: [
                            {
                              descriptor: {
                                name: "Interest Rate",
                                short_desc: "Loans starting from 12% (p.a)",
                              },
                            },
                          ],
                          display: true,
                        },
                      ],
                      xinput: {
                        head: {
                          descriptor: { name: "Customer Information" },
                          index: { min: 0, cur: 0, max: 2 },
                          headings: [
                            "Employment Information",
                            "Financial Information",
                            "Know your Customer",
                          ],
                        },
                        form: {
                          mime_type: "text/html",
                          url: "https://6vs8xnx5i7.icicibank.co.in/employment-details/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                          resubmit: false,
                          multiple_sumbissions: false,
                        },
                        required: true,
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "The consumer receives the form for employment details.",
          api: "form",
          details: {
            description:
              "The provider platform sends the form to collect employment details from the consumer.",
          },
          reference: "if any",
          example: {
            value:
              '<!DOCTYPE html>\r\n<html lang="en">\r\n\r\n<head>\r\n  <meta charset="UTF-8">\r\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\r\n  <title>Document</title>\r\n</head>\r\n\r\n<body>\r\n  <form>\r\n    <label for="idType">Identity Type</label>\r\n    <select name="idType" id="idType">\r\n      <option value="pan">PAN</option>\r\n      <option value="aadhaar">Aadhaar</option>\r\n    </select>\r\n    <label for="idValue">ID Number</label>\r\n    <input type="text" id="idValue" name="idValue" />\r\n    <label for="incomeProofType">Income Proof Type</label>\r\n    <select name="incomeProofType" id="incomeProofType">\r\n      <option value="salary_slip">Salary Slip</option>\r\n      <option value="income_tax_return">Income Tax Return</option>\r\n    </select>\r\n    <label for="incomeProof">Upload the Income Proof</label>\r\n    <input name="incomeProof" type="file" />\r\n  </form>\r\n</body>\r\n\r\n</html>',
          },
        },
        {
          summary: "The consumer chooses the personal loan service.",
          api: "select",
          details: [
            {
              description:
                "The consumer selects the specific personal loan service they are interested in.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                action: "select",
                timestamp: "2023-05-25T05:23:03.443Z",
                version: "1.1.0",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bap_id: "credit-protocol.becknprotocol.io",
                ttl: "PT10M",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
              },
              message: {
                order: {
                  provider: { id: "1" },
                  items: [
                    {
                      id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                      xinput: {
                        form_response: {
                          status: true,
                          submission_id: "cc9aa874-fcf9-4497-aa1d-33419134f9a2",
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary:
            "The provider offers the required form for the chosen personal loan service.",
          api: "on_select",
          details: [
            {
              description:
                "The provider platform responds with detailed information and the necessary application form for the selected personal loan service.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                action: "on_select",
                version: "1.1.0",
                bap_id: "credit-protocol.becknprotocol.io",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62195",
                message_id: "c8e3968c-cd78-4e46-aa34-0d541e46bd73",
                timestamp: "2023-05-25T05:23:03.443Z",
                ttl: "P30M",
              },
              message: {
                order: {
                  provider: {
                    id: "1",
                    descriptor: {
                      images: [
                        {
                          url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                          size_type: "sm",
                        },
                      ],
                      name: "ICICI Bank",
                      short_desc: "ICICI Bank Ltd",
                      long_desc: "ICICI Bank Ltd, India.",
                    },
                  },
                  items: [
                    {
                      id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                      descriptor: {
                        code: "personal-loan",
                        name: "Personal Loan",
                      },
                      tags: [
                        {
                          descriptor: {
                            code: "general-info",
                            name: "General Information",
                          },
                          list: [
                            {
                              descriptor: {
                                name: "Interest Rate",
                                short_desc: "Loans starting from 12% (p.a)",
                              },
                            },
                          ],
                          display: true,
                        },
                      ],
                      xinput: {
                        head: {
                          descriptor: { name: "Customer Information" },
                          index: { min: 0, cur: 1, max: 2 },
                          headings: [
                            "Employment Information",
                            "Financial Information",
                            "Know your Customer",
                          ],
                        },
                        form: {
                          mime_type: "text/html",
                          url: "https://6vs8xnx5i7.icicibank.co.in/loans-details/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                          resubmit: false,
                          multiple_sumbissions: false,
                        },
                        required: true,
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary:
            "The provider offers the required form for financial details.",
          api: "form",
          details: {
            description:
              "The provider platform responds with detailed information and the necessary form for financial details of the chosen personal loan service.",
          },
          reference: "if any",
          example: {
            value:
              '<!DOCTYPE html>\r\n<html lang="en">\r\n\r\n<head>\r\n  <meta charset="UTF-8">\r\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\r\n  <title>Document</title>\r\n</head>\r\n\r\n<body>\r\n  <form>\r\n    <label for="aa_id">Account Aggregator ID</label>\r\n    <input type="text" id="aa_id" name="aa_id" />\r\n    <label for="requestAmount">Requested Loan Amount</label>\r\n    <input type="text" id="requestAmount" name="requestAmount" />\r\n    <label for="tnc">I have read the <a href="https://icicibank.co.in/loans/tnc.html">Terms and Conditions</a></label>\r\n    <input type="checkbox" id="tnc" name="tnc" />\r\n  </form>\r\n</body>\r\n\r\n</html>',
          },
        },
        {
          summary: "The consumer chooses the personal loan service.",
          api: "select",
          details: [
            {
              description:
                "The consumer selects the specific personal loan service they are interested in.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                action: "select",
                timestamp: "2023-05-25T05:23:03.443Z",
                version: "1.1.0",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bap_id: "credit-protocol.becknprotocol.io",
                ttl: "PT10M",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
              },
              message: {
                order: {
                  provider: { id: "1" },
                  items: [
                    {
                      id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                      xinput: {
                        form_response: {
                          status: true,
                          submission_id: "c844d5f4-29c3-4398-b594-8b4716ef5dbf",
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary:
            "The provider offers the required form for the chosen personal loan service.",
          api: "on_select",
          details: [
            {
              description:
                "The provider platform responds with detailed information and the necessary application form for the selected personal loan service.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                action: "on_select",
                version: "1.1.0",
                bap_id: "credit-protocol.becknprotocol.io",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62195",
                message_id: "c8e3968c-cd78-4e46-aa34-0d541e46bd73",
                timestamp: "2023-05-25T05:23:03.443Z",
                ttl: "P30M",
              },
              message: {
                order: {
                  provider: {
                    id: "1",
                    descriptor: {
                      images: [
                        {
                          url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                          size_type: "sm",
                        },
                      ],
                      name: "ICICI Bank",
                      short_desc: "ICICI Bank Ltd",
                      long_desc: "ICICI Bank Ltd, India.",
                    },
                  },
                  items: [
                    {
                      id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                      descriptor: {
                        code: "personal-loan",
                        name: "Personal Loan Offer: INR 2,00,000",
                      },
                      tags: [
                        {
                          descriptor: { name: "Personal loan terms" },
                          list: [
                            {
                              descriptor: {
                                name: "Interest Rate",
                                short_desc: "Rate of Interest (p.a)",
                              },
                              value: "12%",
                            },
                            {
                              descriptor: {
                                name: "Interest Type",
                                short_desc: "Type of Interest Rate",
                              },
                              value: "FLOATING",
                            },
                            {
                              descriptor: {
                                name: "Term",
                                short_desc: "Max Loan Term",
                              },
                              value: "5 months",
                            },
                            {
                              descriptor: {
                                name: "Foreclosure Penalty",
                                short_desc: "Loan Foreclosure Penalty",
                              },
                              value: "0.5%",
                            },
                            {
                              descriptor: {
                                name: "Delayed payments penalty",
                                short_desc: "Delayed payments penalty",
                              },
                              value: "5%",
                            },
                            {
                              descriptor: {
                                name: "Terms & Conditions",
                                short_desc: "Terms and Conditions",
                              },
                              value: "https://icicibank.com/loan/tnc.html",
                            },
                          ],
                          display: true,
                        },
                      ],
                      xinput: {
                        head: {
                          descriptor: { name: "Customer Information" },
                          index: { min: 0, cur: 2, max: 2 },
                          headings: [
                            "Employment Information",
                            "Financial Information",
                            "Know your Customer",
                          ],
                        },
                        form: {
                          mime_type: "text/html",
                          url: "https://6vs8xnx5i7.icicibank.co.in/loans-kyc/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                          resubmit: false,
                          multiple_sumbissions: false,
                        },
                        required: true,
                      },
                    },
                  ],
                  quote: {
                    id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                    price: { currency: "INR", value: "171800" },
                    breakup: [
                      {
                        title: "Principal",
                        price: { value: "150000", currency: "INR" },
                      },
                      {
                        title: "Interest",
                        price: { value: "20000", currency: "INR" },
                      },
                      {
                        title: "Processing fee",
                        price: { value: "1800", currency: "INR" },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        {
          summary: "The consumer receives the KYC details form.",
          api: "form",
          details: {
            description:
              "The provider platform sends the form to collect Know Your Customer (KYC) details from the consumer.",
          },
          reference: "if any",
          example: {
            value:
              '<!DOCTYPE html>\r\n<html lang="en">\r\n\r\n<head>\r\n  <meta charset="UTF-8">\r\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\r\n  <title>Document</title>\r\n</head>\r\n\r\n<body>\r\n  <form>\r\n    <label for="adhrNo">Aadhaar Number: </label>\r\n    <input type="text" id="adhrNo" name="adhrNo" />\r\n    <label for="tnc">I agree to fetch the necessary information using my Aadhaar</a></label>\r\n    <input type="checkbox" id="tnc" name="tnc" />\r\n  </form>\r\n</body>\r\n\r\n</html>',
          },
        },
        {
          summary: "The consumer initiates the personal loan request.",
          api: "init",
          details: [
            {
              description:
                "The consumer platform shares the request's terms and initializes the personal loan application.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                version: "1.1.0",
                action: "init",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bap_id: "credit-protocol.becknprotocol.io",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                message_id: "0d30bfbf-87b8-43d2-8f95-36ebb9a24fd6",
                ttl: "PT10M",
                timestamp: "2023-05-25T05:23:03.443Z",
              },
              message: {
                order: {
                  provider: { id: "1" },
                  items: [
                    {
                      id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                      xinput: {
                        form_response: {
                          status: true,
                          submission_id: "73ef9742-c17d-4c4e-92e3-b057960863af",
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "The provider accepts and adds terms to the request.",
          api: "on_init",
          details: [
            {
              description:
                "The provider platform accepts the consumer's request terms and may include additional terms if needed.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                version: "1.1.0",
                action: "on_init",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bap_id: "credit-protocol.becknprotocol.io",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                message_id: "166a5633-66d2-4ec8-bdcb-65cfeb1e4697",
                ttl: "PT10M",
                timestamp: "2023-05-25T05:23:03.443Z",
              },
              message: {
                order: {
                  provider: {
                    id: "1",
                    descriptor: {
                      images: [
                        {
                          url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                          size_type: "sm",
                        },
                      ],
                      name: "ICICI Bank",
                      short_desc: "ICICI Bank Ltd",
                      long_desc: "ICICI Bank Ltd, India.",
                    },
                  },
                  items: [
                    {
                      id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                      descriptor: {
                        code: "personal-loan",
                        name: "Personal Loan Offer: INR 2,00,000",
                      },
                      price: { currency: "INR", value: "231800" },
                      tags: [
                        {
                          descriptor: { name: "Personal loan terms" },
                          list: [
                            {
                              descriptor: {
                                name: "Interest Rate",
                                short_desc: "Rate of Interest (p.a)",
                              },
                              value: "12%",
                            },
                            {
                              descriptor: {
                                name: "Interest Type",
                                short_desc: "Type of Interest Rate",
                              },
                              value: "FLOATING",
                            },
                            {
                              descriptor: {
                                name: "Term",
                                short_desc: "Max Loan Term",
                              },
                              value: "5 months",
                            },
                            {
                              descriptor: {
                                name: "Foreclosure Penalty",
                                short_desc: "Loan Foreclosure Penalty",
                              },
                              value: "0.5%",
                            },
                            {
                              descriptor: {
                                name: "Delayed payments penalty",
                                short_desc: "Delayed payments penalty",
                              },
                              value: "5%",
                            },
                            {
                              descriptor: {
                                name: "Terms & Conditions",
                                short_desc: "Terms and Conditions",
                              },
                              value: "https://icicibank.com/loan/tnc.html",
                            },
                          ],
                          display: true,
                        },
                      ],
                      xinput: {
                        head: {
                          descriptor: { name: "Account Information" },
                          index: { min: 0, cur: 0, max: 1 },
                          headings: ["Account Information", "Loan Agreement"],
                        },
                        form: {
                          mime_type: "text/html",
                          url: "https://6vs8xnx5i7.icicibank.co.in/account-details/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                          resubmit: false,
                          multiple_sumbissions: false,
                        },
                        required: true,
                      },
                    },
                  ],
                  quote: {
                    id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                    price: { currency: "INR", value: "231800" },
                    breakup: [
                      {
                        title: "Principal",
                        price: { value: "200000", currency: "INR" },
                      },
                      {
                        title: "Interest",
                        price: { value: "30000", currency: "INR" },
                      },
                      {
                        title: "Processing fee",
                        price: { value: "1800", currency: "INR" },
                      },
                    ],
                  },
                  fulfillments: [
                    {
                      customer: {
                        person: { name: "John Doe" },
                        contact: {
                          phone: "+91-9999999999",
                          email: "john.doe@example.com",
                        },
                      },
                      state: { descriptor: { name: "Loan Initiated" } },
                    },
                  ],
                  payments: [
                    {
                      type: "ON-ORDER",
                      url: "https://emandate.icicibank.in",
                      params: { amount: "46360", currency: "INR" },
                      status: "NOT-PAID",
                      time: {
                        range: {
                          start: "2023-06-01T00:00:00.000Z",
                          end: "2023-06-30T23:59:59.999Z",
                        },
                      },
                    },
                    {
                      params: { amount: "46360", currency: "INR" },
                      status: "NOT-PAID",
                      time: {
                        range: {
                          start: "2023-07-01T00:00:00.000Z",
                          end: "2023-07-31T23:59:59.999Z",
                        },
                      },
                    },
                    {
                      params: { amount: "46360", currency: "INR" },
                      status: "NOT-PAID",
                      time: {
                        range: {
                          start: "2023-08-01T00:00:00.000Z",
                          end: "2023-08-31T23:59:59.999Z",
                        },
                      },
                    },
                    {
                      params: { amount: "46360", currency: "INR" },
                      status: "NOT-PAID",
                      time: {
                        range: {
                          start: "2023-09-01T00:00:00.000Z",
                          end: "2023-09-30T23:59:59.999Z",
                        },
                      },
                    },
                    {
                      params: { amount: "46360", currency: "INR" },
                      status: "NOT-PAID",
                      time: {
                        range: {
                          start: "2023-10-01T00:00:00.000Z",
                          end: "2023-10-31T23:59:59.999Z",
                        },
                      },
                    },
                  ],
                  cancellation_terms: [
                    {
                      fulfillment_state: {
                        descriptor: { name: "Loan sanctioned" },
                      },
                      cancellation_fee: { percentage: "3%" },
                      external_ref: {
                        mimetype: "text/html",
                        url: "https://icicibank.com/loan/tnc.html",
                      },
                    },
                    {
                      fulfillment_state: {
                        descriptor: { name: "Loan disbursed" },
                      },
                      cancellation_fee: { percentage: "5%" },
                      external_ref: {
                        mimetype: "text/html",
                        url: "https://icicibank.com/loan/tnc.html",
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "The consumer confirms the personal loan request.",
          api: "confirm",
          details: [
            {
              description:
                "The consumer platform confirms the personal loan request and provides all the necessary information as per the terms.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                action: "confirm",
                timestamp: "2023-05-25T05:23:03.443Z",
                version: "1.1.0",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bap_id: "credit-protocol.becknprotocol.io",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
                ttl: "PT10M",
              },
              message: {
                order: {
                  provider: { id: "1" },
                  items: [
                    {
                      id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                      xinput: {
                        form_response: {
                          status: true,
                          submission_id: "c844d5f4-29c3-4398-b594-8b4716ef5dbf",
                        },
                      },
                    },
                  ],
                  fulfillments: [
                    {
                      stops: [
                        { authorization: { type: "OTP", token: "535346" } },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "The provider confirms the personal loan order.",
          api: "on_confirm",
          details: [
            {
              description:
                "The provider platform confirms the personal loan order and provides the final confirmation details.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                version: "1.1.0",
                action: "on_confirm",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bap_id: "credit-protocol.becknprotocol.io",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                message_id: "166a5633-66d2-4ec8-bdcb-65cfeb1e4697",
                ttl: "PT10M",
                timestamp: "2023-05-25T05:23:03.443Z",
              },
              message: {
                order: {
                  id: "66B7AEDF45",
                  provider: {
                    id: "1",
                    descriptor: {
                      images: [
                        {
                          url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                          size_type: "sm",
                        },
                      ],
                      name: "ICICI Bank",
                      short_desc: "ICICI Bank Ltd",
                      long_desc: "ICICI Bank Ltd, India.",
                    },
                  },
                  items: [
                    {
                      id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                      descriptor: {
                        code: "personal-loan",
                        name: "Personal Loan Offer: INR 2,00,000",
                      },
                      price: { currency: "INR", value: "231800" },
                      tags: [
                        {
                          descriptor: { name: "Personal loan terms" },
                          list: [
                            {
                              descriptor: {
                                name: "Interest Rate",
                                short_desc: "Rate of Interest (p.a)",
                              },
                              value: "12%",
                            },
                            {
                              descriptor: {
                                name: "Interest Type",
                                short_desc: "Type of Interest Rate",
                              },
                              value: "FLOATING",
                            },
                            {
                              descriptor: {
                                name: "Term",
                                short_desc: "Max Loan Term",
                              },
                              value: "5 months",
                            },
                            {
                              descriptor: {
                                name: "Foreclosure Penalty",
                                short_desc: "Loan Foreclosure Penalty",
                              },
                              value: "0.5%",
                            },
                            {
                              descriptor: {
                                name: "Delayed payments penalty",
                                short_desc: "Delayed payments penalty",
                              },
                              value: "5%",
                            },
                            {
                              descriptor: {
                                name: "Terms & Conditions",
                                short_desc: "Terms and Conditions",
                              },
                              value: "https://icicibank.com/loan/tnc.html",
                            },
                          ],
                          display: true,
                        },
                      ],
                    },
                  ],
                  quote: {
                    id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                    price: { currency: "INR", value: "231800" },
                    breakup: [
                      {
                        title: "Principal",
                        price: { value: "200000", currency: "INR" },
                      },
                      {
                        title: "Interest",
                        price: { value: "30000", currency: "INR" },
                      },
                      {
                        title: "Processing fee",
                        price: { value: "1800", currency: "INR" },
                      },
                    ],
                  },
                  fulfillments: [
                    {
                      customer: {
                        person: { name: "John Doe" },
                        contact: {
                          phone: "+91-9999999999",
                          email: "john.doe@example.com",
                        },
                      },
                      state: { descriptor: { name: "Loan Sanctioned" } },
                    },
                  ],
                  payments: [
                    {
                      type: "ON-ORDER",
                      url: "https://emandate.icicibank.in",
                      params: { amount: "46360", currency: "INR" },
                      status: "NOT-PAID",
                      time: {
                        range: {
                          start: "2023-06-01T00:00:00.000Z",
                          end: "2023-06-30T23:59:59.999Z",
                        },
                      },
                    },
                    {
                      params: { amount: "46360", currency: "INR" },
                      status: "NOT-PAID",
                      time: {
                        range: {
                          start: "2023-07-01T00:00:00.000Z",
                          end: "2023-07-31T23:59:59.999Z",
                        },
                      },
                    },
                    {
                      params: { amount: "46360", currency: "INR" },
                      status: "NOT-PAID",
                      time: {
                        range: {
                          start: "2023-08-01T00:00:00.000Z",
                          end: "2023-08-31T23:59:59.999Z",
                        },
                      },
                    },
                    {
                      params: { amount: "46360", currency: "INR" },
                      status: "NOT-PAID",
                      time: {
                        range: {
                          start: "2023-09-01T00:00:00.000Z",
                          end: "2023-09-30T23:59:59.999Z",
                        },
                      },
                    },
                    {
                      params: { amount: "46360", currency: "INR" },
                      status: "NOT-PAID",
                      time: {
                        range: {
                          start: "2023-10-01T00:00:00.000Z",
                          end: "2023-10-30T23:59:59.999Z",
                        },
                      },
                    },
                  ],
                  cancellation_terms: [
                    {
                      fulfillment_state: {
                        descriptor: { name: "Loan sanctioned" },
                      },
                      cancellation_fee: { percentage: "3%" },
                      external_ref: {
                        mimetype: "text/html",
                        url: "https://icicibank.com/loan/tnc.html",
                      },
                    },
                    {
                      fulfillment_state: {
                        descriptor: { name: "Loan disbursed" },
                      },
                      cancellation_fee: { percentage: "5%" },
                      external_ref: {
                        mimetype: "text/html",
                        url: "https://icicibank.com/loan/tnc.html",
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "The consumer seeks the most recent loan status update.",
          api: "status",
          details: [
            {
              description:
                "The consumer platform requests the provider platform to provide the latest status of the personal loan application.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                action: "status",
                timestamp: "2023-05-25T05:23:03.443Z",
                version: "1.1.0",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bap_id: "credit-protocol.becknprotocol.io",
                ttl: "PT10M",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
              },
              message: { order_id: "66b7b9bad166-4a3f-ada6-ca063dc9d321" },
            },
          },
        },
        {
          summary:
            "The provider shares the latest loan status with the consumer.",
          api: "on_status",
          details: [
            {
              description:
                "The provider platform updates the consumer with the most recent status of the personal loan application.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                version: "1.1.0",
                action: "on_status",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bap_id: "credit-protocol.becknprotocol.io",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                message_id: "166a5633-66d2-4ec8-bdcb-65cfeb1e4697",
                ttl: "PT10M",
                timestamp: "2023-05-25T05:23:03.443Z",
              },
              message: {
                order: {
                  id: "66B7AEDF45",
                  provider: {
                    id: "1",
                    descriptor: {
                      images: [
                        {
                          url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                          size_type: "sm",
                        },
                      ],
                      name: "ICICI Bank",
                      short_desc: "ICICI Bank Ltd",
                      long_desc: "ICICI Bank Ltd, India.",
                    },
                  },
                  items: [
                    {
                      id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                      descriptor: {
                        code: "personal-loan",
                        name: "Personal Loan Offer: INR 2,00,000",
                      },
                      price: { currency: "INR", value: "231800" },
                      tags: [
                        {
                          descriptor: { name: "Personal loan terms" },
                          list: [
                            {
                              descriptor: {
                                name: "Interest Rate",
                                short_desc: "Rate of Interest (p.a)",
                              },
                              value: "12%",
                            },
                            {
                              descriptor: {
                                name: "Interest Type",
                                short_desc: "Type of Interest Rate",
                              },
                              value: "FLOATING",
                            },
                            {
                              descriptor: {
                                name: "Term",
                                short_desc: "Max Loan Term",
                              },
                              value: "5 months",
                            },
                            {
                              descriptor: {
                                name: "Foreclosure Penalty",
                                short_desc: "Loan Foreclosure Penalty",
                              },
                              value: "0.5%",
                            },
                            {
                              descriptor: {
                                name: "Delayed payments penalty",
                                short_desc: "Delayed payments penalty",
                              },
                              value: "5%",
                            },
                            {
                              descriptor: {
                                name: "Terms & Conditions",
                                short_desc: "Terms and Conditions",
                              },
                              value: "https://icicibank.com/loan/tnc.html",
                            },
                          ],
                          display: true,
                        },
                      ],
                    },
                  ],
                  quote: {
                    id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                    price: { currency: "INR", value: "231800" },
                    breakup: [
                      {
                        title: "Installment 1",
                        price: { value: "46360", currency: "INR" },
                      },
                      {
                        title: "Installment 2",
                        price: { value: "46360", currency: "INR" },
                      },
                      {
                        title: "Installment 3",
                        price: { value: "46360", currency: "INR" },
                      },
                      {
                        title: "Installment 4",
                        price: { value: "46360", currency: "INR" },
                      },
                      {
                        title: "Installment 5",
                        price: { value: "46360", currency: "INR" },
                      },
                    ],
                  },
                  fulfillments: [
                    {
                      customer: {
                        person: { name: "John Doe" },
                        contact: {
                          phone: "+91-9999999999",
                          email: "john.doe@example.com",
                        },
                      },
                      state: {
                        descriptor: { name: "Installment 1/5 received" },
                      },
                    },
                  ],
                  payments: [
                    {
                      url: "https://emandate.icicibank.in",
                      params: { amount: "231800", currency: "INR" },
                      status: "NOT-PAID",
                    },
                  ],
                  cancellation_terms: [
                    {
                      fulfillment_state: {
                        descriptor: { name: "Loan sanctioned" },
                      },
                      cancellation_fee: { percentage: "3%" },
                      external_ref: {
                        mimetype: "text/html",
                        url: "https://icicibank.com/loan/tnc.html",
                      },
                    },
                    {
                      fulfillment_state: {
                        descriptor: { name: "Loan disbursed" },
                      },
                      cancellation_fee: { percentage: "5%" },
                      external_ref: {
                        mimetype: "text/html",
                        url: "https://icicibank.com/loan/tnc.html",
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      ],
    },
    {
      summary: "Invoice based loans",
      details: [{ description: "Invoice based loan description" }],
      references: "if any",
      steps: [
        {
          summary:
            "Find suitable Invoice Based Loan services over the network.",
          api: "search",
          details: [
            {
              description:
                "Explore available Invoice Based Loan options by conducting searches over the network.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                action: "search",
                timestamp: "2023-05-25T05:23:03.443Z",
                version: "1.1.0",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bap_id: "credit-protocol.becknprotocol.io",
                ttl: "PT10M",
              },
              message: {
                intent: {
                  category: { descriptor: { code: "invoice-based-loan" } },
                },
              },
            },
          },
        },
        {
          summary:
            "Provides a catalog of different loan products offered by a single lender for Invoice Based Loans.",
          api: "on_search",
          details: [
            {
              description:
                "Platform sends a comprehensive catalog of various loan products specifically tailored for Invoice Based Loans, all of which are offered by a single lender.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                version: "1.1.0",
                action: "on_search",
                bap_id: "credit-protocol.becknprotocol.io",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                ttl: "PT30M",
                timestamp: "2023-05-25T05:23:03.443Z",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
              },
              message: {
                catalog: {
                  descriptor: { name: "ICICI Bank" },
                  providers: [
                    {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                      categories: [
                        {
                          id: "101123",
                          descriptor: {
                            code: "invoice-based-loan",
                            name: "Invoice based loan",
                          },
                        },
                      ],
                      items: [
                        {
                          id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                          descriptor: {
                            code: "invoice-based-loan",
                            name: "Invoice based Loan",
                          },
                          category_ids: ["101123"],
                          tags: [
                            {
                              descriptor: {
                                code: "general-info",
                                name: "General Information",
                              },
                              list: [
                                {
                                  descriptor: {
                                    name: "Interest Rate",
                                    short_desc: "Loans starting from 12% (p.a)",
                                  },
                                },
                              ],
                              display: true,
                            },
                          ],
                          matched: true,
                          recommended: true,
                          xinput: {
                            head: {
                              descriptor: { name: "Customer Information" },
                              index: { min: 0, cur: 0, max: 0 },
                              headings: ["Organization Information"],
                            },
                            form: {
                              id: "d097c2f5-cb8d-42fe-900e-dfecdede16fb",
                              mime_type: "text/html",
                              url: "https://6vs8xnx5i7.icicibank.co.in/loans/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                              resubmit: false,
                              multiple_sumbissions: false,
                            },
                            required: true,
                          },
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Get the Invoice based loan form",
          api: "form",
          details: {
            description:
              "Provide platform sends the form for Invoice based loan.",
          },
          reference: "if any",
          example: {
            value:
              '<!DOCTYPE html>\r\n<html lang="en">\r\n\r\n<head>\r\n  <meta charset="UTF-8">\r\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\r\n  <title>Document</title>\r\n</head>\r\n\r\n<body>\r\n  <form>\r\n    <label for="gstin">GSTIN</label>\r\n    <input type="text" id="gstin" name="gstin" />\r\n    <label for="udyamNumber">UDYAM Number</label>\r\n    <input type="text" id="udyamNumber" name="udyamNumber" />\r\n    <label for="mobNo">Mobile Number</label>\r\n    <input type="date" id="mobNo" name="mobNo" />\r\n    <label for="address">Address</label>\r\n    <input type="text" id="address" name="address" />\r\n  </form>\r\n</body>\r\n\r\n</html>',
          },
        },
        {
          summary: "Selection of a specific Loan Product",
          api: "select",
          details: [
            {
              description:
                "The BAP sends the loan product, the loan provider, and the customer's identity to the BPP.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                action: "select",
                timestamp: "2023-05-25T05:23:03.443Z",
                version: "1.1.0",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bap_id: "credit-protocol.becknprotocol.io",
                ttl: "PT10M",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
              },
              message: {
                order: {
                  provider: { id: "1" },
                  items: [
                    {
                      id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                      xinput: {
                        form_response: {
                          status: true,
                          submission_id: "c844d5f4-29c3-4398-b594-8b4716ef5dbf",
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary:
            "Returning a consent request with additional details about the loan product",
          api: "on_select",
          details: [
            {
              description:
                "The Lender Platform generates a consent request, and an XInput form may expect other details pertaining to the borrower's business like Tax ID. Company registration address, Ownership Details etc, depending on the type of loan.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                action: "on_select",
                version: "1.1.0",
                bap_id: "credit-protocol.becknprotocol.io",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62195",
                message_id: "c8e3968c-cd78-4e46-aa34-0d541e46bd73",
                timestamp: "2023-05-25T05:23:03.443Z",
                ttl: "P30M",
              },
              message: {
                order: {
                  provider: {
                    id: "1",
                    descriptor: {
                      images: [
                        {
                          url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                          size_type: "sm",
                        },
                      ],
                      name: "ICICI Bank",
                      short_desc: "ICICI Bank Ltd",
                      long_desc: "ICICI Bank Ltd, India.",
                    },
                  },
                  items: [
                    {
                      id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                      descriptor: {
                        code: "invoice-based-loan",
                        name: "Invoice Based Loan Offer: INR 2,00,000",
                      },
                      tags: [
                        {
                          descriptor: {
                            code: "general-info",
                            name: "General Information",
                          },
                          list: [
                            {
                              descriptor: {
                                name: "Interest Rate",
                                short_desc: "Loans starting from 12% (p.a)",
                              },
                            },
                          ],
                          display: true,
                        },
                      ],
                      xinput: {
                        head: {
                          descriptor: { name: "Customer Information" },
                          index: { min: 0, cur: 0, max: 2 },
                          headings: [
                            "Financial Information",
                            "Individual KYC",
                            "Entity KYC",
                          ],
                        },
                        form: {
                          mime_type: "text/html",
                          url: "https://6vs8xnx5i7.icicibank.co.in/loans-details/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                          resubmit: false,
                          multiple_sumbissions: false,
                        },
                        required: true,
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Get the Financial Info based loan form",
          api: "form",
          details: {
            description:
              "Provider platform sends the form for Financial Info based loan.",
          },
          reference: "if any",
          example: {
            value:
              '<!DOCTYPE html>\r\n<html lang="en">\r\n\r\n<head>\r\n  <meta charset="UTF-8">\r\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\r\n  <title>Document</title>\r\n</head>\r\n\r\n<body>\r\n  <form>\r\n    <label for="aa_id">Account Aggregator ID</label>\r\n    <input type="text" id="aa_id" name="aa_id" />\r\n    <label for="requestAmount">Requested Loan Amount</label>\r\n    <input type="text" id="requestAmount" name="requestAmount" />\r\n    <label for="tnc">I have read the <a href="https://icicibank.co.in/loans/tnc.html">Terms and Conditions</a></label>\r\n    <input type="checkbox" id="tnc" name="tnc" />\r\n  </form>\r\n</body>\r\n\r\n</html>',
          },
        },
        {
          summary: "Selection of a specific Loan Product",
          api: "select",
          details: [
            {
              description:
                "The BAP sends the loan product, the loan provider, and the customer's identity to the BPP.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                action: "select",
                timestamp: "2023-05-25T05:23:03.443Z",
                version: "1.1.0",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bap_id: "credit-protocol.becknprotocol.io",
                ttl: "PT10M",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
              },
              message: {
                order: {
                  provider: { id: "1" },
                  items: [
                    {
                      id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                      xinput: {
                        form_response: {
                          status: true,
                          submission_id: "242ea230-2b57-4126-bd21-5929325de465",
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary:
            "Returning a consent request with additional details about the loan product",
          api: "on_select",
          details: [
            {
              description:
                "The Lender Platform generates a consent request, and an XInput form may expect other details pertaining to the borrower's business like Tax ID. Company registration address, Ownership Details etc, depending on the type of loan.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                action: "on_select",
                version: "1.1.0",
                bap_id: "credit-protocol.becknprotocol.io",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62195",
                message_id: "c8e3968c-cd78-4e46-aa34-0d541e46bd73",
                timestamp: "2023-05-25T05:23:03.443Z",
                ttl: "P30M",
              },
              message: {
                order: {
                  provider: {
                    id: "1",
                    descriptor: {
                      images: [
                        {
                          url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                          size_type: "sm",
                        },
                      ],
                      name: "ICICI Bank",
                      short_desc: "ICICI Bank Ltd",
                      long_desc: "ICICI Bank Ltd, India.",
                    },
                  },
                  items: [
                    {
                      id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                      descriptor: {
                        code: "invoice-based-loan",
                        name: "Invoice Based Loan Offer: INR 2,00,000",
                      },
                      tags: [
                        {
                          descriptor: { name: "Invoice based loan terms" },
                          list: [
                            {
                              descriptor: {
                                name: "Interest Rate",
                                short_desc: "Rate of Interest (p.a)",
                              },
                              value: "12%",
                            },
                            {
                              descriptor: {
                                name: "Interest Type",
                                short_desc: "Type of Interest Rate",
                              },
                              value: "FLOATING",
                            },
                            {
                              descriptor: {
                                name: "Term",
                                short_desc: "Max Loan Term",
                              },
                              value: "5 months",
                            },
                            {
                              descriptor: {
                                name: "Foreclosure Penalty",
                                short_desc: "Loan Foreclosure Penalty",
                              },
                              value: "0.5%",
                            },
                            {
                              descriptor: {
                                name: "Delayed payments penalty",
                                short_desc: "Delayed payments penalty",
                              },
                              value: "5%",
                            },
                            {
                              descriptor: {
                                name: "Terms & Conditions",
                                short_desc: "Terms and Conditions",
                              },
                              value: "https://icicibank.com/loan/tnc.html",
                            },
                          ],
                          display: true,
                        },
                      ],
                      xinput: {
                        head: {
                          descriptor: { name: "Customer Information" },
                          index: { min: 0, cur: 1, max: 2 },
                          headings: [
                            "Financial Information",
                            "Individual KYC",
                            "Entity KYC",
                          ],
                        },
                        form: {
                          mime_type: "text/html",
                          url: "https://6vs8xnx5i7.icicibank.co.in/individual-kyc/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                          resubmit: false,
                          multiple_sumbissions: false,
                        },
                        required: true,
                      },
                    },
                  ],
                  quote: {
                    id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                    price: { currency: "INR", value: "171800" },
                    breakup: [
                      {
                        title: "Principal",
                        price: { value: "150000", currency: "INR" },
                      },
                      {
                        title: "Interest",
                        price: { value: "20000", currency: "INR" },
                      },
                      {
                        title: "Processing fee",
                        price: { value: "1800", currency: "INR" },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        {
          summary: "Get the Individual Kyc Info based loan form",
          api: "form",
          details: {
            description:
              "Provider platform sends the form for Individual Kyc Info based loan.",
          },
          reference: "if any",
          example: {
            value:
              '<!DOCTYPE html>\r\n<html lang="en">\r\n\r\n<head>\r\n  <meta charset="UTF-8">\r\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\r\n  <title>Document</title>\r\n</head>\r\n\r\n<body>\r\n  <form>\r\n    <label for="aa_id">Account Aggregator ID</label>\r\n    <input type="text" id="aa_id" name="aa_id" />\r\n    <label for="requestAmount">Requested Loan Amount</label>\r\n    <input type="text" id="requestAmount" name="requestAmount" />\r\n    <label for="tnc">I have read the <a href="https://icicibank.co.in/loans/tnc.html">Terms and Conditions</a></label>\r\n    <input type="checkbox" id="tnc" name="tnc" />\r\n  </form>\r\n</body>\r\n\r\n</html>',
          },
        },
        {
          summary: "Selection of a specific Loan Product",
          api: "select",
          details: [
            {
              description:
                "The BAP sends the loan product, the loan provider, and the customer's identity to the BPP.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                action: "select",
                timestamp: "2023-05-25T05:23:03.443Z",
                version: "1.1.0",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bap_id: "credit-protocol.becknprotocol.io",
                ttl: "PT10M",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
              },
              message: {
                order: {
                  provider: { id: "1" },
                  items: [
                    {
                      id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                      xinput: {
                        form_response: {
                          status: true,
                          submission_id: "c844d5f4-29c3-4398-b594-8b4716ef5dbf",
                        },
                      },
                      tags: [
                        {
                          descriptor: {
                            name: "GSTIN_PROFILE",
                            long_desc: "GST Profile",
                          },
                          list: [
                            {
                              descriptor: { name: "GSTR1" },
                              value:
                                "H4sICPsdulsCAHJlYWRtZS50eHQAC0/NSc7PTVUoyVdISixONTPRSy8tKlUEAPCdUNYXAAAA",
                            },
                            {
                              descriptor: { name: "GSTR2A" },
                              value:
                                "H4sICPsdulsCAHJlYWRtZS50eHQAC0/NSc7PTVUoyVdISixONTPRSy8tKlUEAPCdUNYXAAAA",
                            },
                            {
                              descriptor: { name: "GSTR3B" },
                              value:
                                "JlYWRtZS50eHQAC0/NSc7PTVUoyVdISixONTPRSy8tKlUEAPCdUNYXAAAA",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary:
            "Returning a consent request with additional details about the loan product",
          api: "on_select",
          details: [
            {
              description:
                "The Lender Platform generates a consent request, and an XInput form may expect other details pertaining to the borrower's business like Tax ID. Company registration address, Ownership Details etc, depending on the type of loan.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                action: "on_select",
                version: "1.1.0",
                bap_id: "credit-protocol.becknprotocol.io",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62195",
                message_id: "c8e3968c-cd78-4e46-aa34-0d541e46bd73",
                timestamp: "2023-05-25T05:23:03.443Z",
                ttl: "P30M",
              },
              message: {
                order: {
                  provider: {
                    id: "1",
                    descriptor: {
                      images: [
                        {
                          url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                          size_type: "sm",
                        },
                      ],
                      name: "ICICI Bank",
                      short_desc: "ICICI Bank Ltd",
                      long_desc: "ICICI Bank Ltd, India.",
                    },
                  },
                  items: [
                    {
                      id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                      descriptor: {
                        code: "invoice-based-loan",
                        name: "Invoice Based Loan Offer: INR 2,00,000",
                      },
                      tags: [
                        {
                          descriptor: { name: "Invoice based loan terms" },
                          list: [
                            {
                              descriptor: {
                                name: "Interest Rate",
                                short_desc: "Rate of Interest (p.a)",
                              },
                              value: "12%",
                            },
                            {
                              descriptor: {
                                name: "Interest Type",
                                short_desc: "Type of Interest Rate",
                              },
                              value: "FLOATING",
                            },
                            {
                              descriptor: {
                                name: "Term",
                                short_desc: "Max Loan Term",
                              },
                              value: "5 months",
                            },
                            {
                              descriptor: {
                                name: "Foreclosure Penalty",
                                short_desc: "Loan Foreclosure Penalty",
                              },
                              value: "0.5%",
                            },
                            {
                              descriptor: {
                                name: "Delayed payments penalty",
                                short_desc: "Delayed payments penalty",
                              },
                              value: "5%",
                            },
                            {
                              descriptor: {
                                name: "Terms & Conditions",
                                short_desc: "Terms and Conditions",
                              },
                              value: "https://icicibank.com/loan/tnc.html",
                            },
                          ],
                          display: true,
                        },
                      ],
                      xinput: {
                        head: {
                          descriptor: { name: "Customer Information" },
                          index: { min: 0, cur: 2, max: 2 },
                          headings: [
                            "Financial Information",
                            "Individual KYC",
                            "Entity KYC",
                          ],
                        },
                        form: {
                          mime_type: "text/html",
                          url: "https://6vs8xnx5i7.icicibank.co.in/individual-kyc/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                          resubmit: false,
                          multiple_sumbissions: false,
                        },
                        required: true,
                      },
                    },
                  ],
                  quote: {
                    id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                    price: { currency: "INR", value: "171800" },
                    breakup: [
                      {
                        title: "Principal",
                        price: { value: "150000", currency: "INR" },
                      },
                      {
                        title: "Interest",
                        price: { value: "20000", currency: "INR" },
                      },
                      {
                        title: "Processing fee",
                        price: { value: "1800", currency: "INR" },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        {
          summary: "Get the Entity Kyc Info based loan form",
          api: "form",
          details: {
            description:
              "Provider platform sends the form for Entity Kyc Info based loan.",
          },
          reference: "if any",
          example: {
            value:
              '<!DOCTYPE html>\r\n<html lang="en">\r\n\r\n<head>\r\n  <meta charset="UTF-8">\r\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\r\n  <title>Document</title>\r\n</head>\r\n\r\n<body>\r\n  <form>\r\n    <label for="accNo">Bank Account Number</label>\r\n    <input type="text" id="accNo" name="accNo" />\r\n    <label for="ifscCode">Bank IFSC Code</label>\r\n    <input type="text" id="ifscCode" name="ifscCode" />\r\n  </form>\r\n</body>\r\n\r\n</html>',
          },
        },
        {
          summary:
            "Submission of Additional Information and requesting for offer",
          api: "init",
          details: [
            {
              description:
                "BAP submits the additional information that was requested by the BPP in the XInput form.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                version: "1.1.0",
                action: "init",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bap_id: "credit-protocol.becknprotocol.io",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                message_id: "0d30bfbf-87b8-43d2-8f95-36ebb9a24fd6",
                ttl: "PT10M",
                timestamp: "2023-05-25T05:23:03.443Z",
              },
              message: {
                order: {
                  provider: { id: "1" },
                  items: [
                    {
                      id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                      xinput: {
                        form_response: {
                          status: true,
                          submission_id: "73ef9742-c17d-4c4e-92e3-b057960863af",
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Lender makes an offer with repayment terms",
          api: "on_init",
          details: [
            {
              description:
                "Provider platform accepts the terms of order and appends its own terms and responds with the final draft",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                version: "1.1.0",
                action: "on_init",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bap_id: "credit-protocol.becknprotocol.io",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                message_id: "166a5633-66d2-4ec8-bdcb-65cfeb1e4697",
                ttl: "PT10M",
                timestamp: "2023-05-25T05:23:03.443Z",
              },
              message: {
                order: {
                  provider: {
                    id: "1",
                    descriptor: {
                      images: [
                        {
                          url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                          size_type: "sm",
                        },
                      ],
                      name: "ICICI Bank",
                      short_desc: "ICICI Bank Ltd",
                      long_desc: "ICICI Bank Ltd, India.",
                    },
                  },
                  items: [
                    {
                      id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                      descriptor: {
                        code: "invoice-based-loan",
                        short_desc: "Invoice based loan of INR 2 Lakhs",
                      },
                      price: { currency: "INR", value: "231800" },
                      tags: [
                        {
                          descriptor: { name: "Invoice based loan terms" },
                          list: [
                            {
                              descriptor: {
                                name: "Interest Rate",
                                short_desc: "Rate of Interest (p.a)",
                              },
                              value: "12%",
                            },
                            {
                              descriptor: {
                                name: "Interest Type",
                                short_desc: "Type of Interest Rate",
                              },
                              value: "FLOATING",
                            },
                            {
                              descriptor: {
                                name: "Term",
                                short_desc: "Max Loan Term",
                              },
                              value: "5 months",
                            },
                            {
                              descriptor: {
                                name: "Foreclosure Penalty",
                                short_desc: "Loan Foreclosure Penalty",
                              },
                              value: "0.5%",
                            },
                            {
                              descriptor: {
                                name: "Delayed payments penalty",
                                short_desc: "Delayed payments penalty",
                              },
                              value: "5%",
                            },
                            {
                              descriptor: {
                                name: "Terms & Conditions",
                                short_desc: "Terms and Conditions",
                              },
                              value: "https://icicibank.com/loan/tnc.html",
                            },
                          ],
                          display: true,
                        },
                      ],
                      xinput: {
                        head: {
                          descriptor: { name: "Account Information" },
                          index: { min: 0, cur: 0, max: 1 },
                          headings: ["Account Information", "Loan Agreement"],
                        },
                        form: {
                          mime_type: "text/html",
                          url: "https://6vs8xnx5i7.icicibank.co.in/account-details/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                          resubmit: false,
                          multiple_sumbissions: false,
                        },
                        required: true,
                      },
                    },
                  ],
                  quote: {
                    id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                    price: { currency: "INR", value: "231800" },
                    breakup: [
                      {
                        title: "Principal",
                        price: { value: "200000", currency: "INR" },
                      },
                      {
                        title: "Interest",
                        price: { value: "30000", currency: "INR" },
                      },
                      {
                        title: "Processing fee",
                        price: { value: "1800", currency: "INR" },
                      },
                    ],
                  },
                  fulfillments: [
                    {
                      customer: {
                        organization: {
                          address: "Industrial Park, Bangalore",
                          state: { name: "Karnataka" },
                          city: { name: "Bangalore", code: "560045" },
                          contact: {
                            phone: "+919876543210",
                            email: "alpha.manufacturing@gmail.com",
                          },
                        },
                      },
                      state: { descriptor: { name: "Loan Initiated" } },
                    },
                  ],
                  payments: [
                    {
                      type: "ON-ORDER",
                      url: "https://emandate.icicibank.in",
                      params: { amount: "46360", currency: "INR" },
                      status: "NOT-PAID",
                      time: {
                        range: {
                          start: "2023-06-01T00:00:00.000Z",
                          end: "2023-06-30T00:23:59.999Z",
                        },
                      },
                    },
                    {
                      params: { amount: "46360", currency: "INR" },
                      status: "NOT-PAID",
                      time: {
                        range: {
                          start: "2023-07-01T00:00:00.000Z",
                          end: "2023-07-31T00:23:59.999",
                        },
                      },
                    },
                    {
                      params: { amount: "46360", currency: "INR" },
                      status: "NOT-PAID",
                      time: {
                        range: {
                          start: "2023-08-01T00:00:00.000Z",
                          end: "2023-08-31T00:23:59.999",
                        },
                      },
                    },
                    {
                      params: { amount: "46360", currency: "INR" },
                      status: "NOT-PAID",
                      time: {
                        range: {
                          start: "2023-09-01T00:00:00.000Z",
                          end: "2023-09-30T00:23:59.999Z",
                        },
                      },
                    },
                    {
                      params: { amount: "46360", currency: "INR" },
                      status: "NOT-PAID",
                      time: {
                        range: {
                          start: "2023-10-01T00:00:00.000Z",
                          end: "2023-10-31T00:23:59.999",
                        },
                      },
                    },
                  ],
                  cancellation_terms: [
                    {
                      fulfillment_state: {
                        descriptor: { name: "Loan sanctioned" },
                      },
                      cancellation_fee: { percentage: "3%" },
                      external_ref: {
                        mimetype: "text/html",
                        url: "https://icicibank.com/loan/tnc.html",
                      },
                    },
                    {
                      fulfillment_state: {
                        descriptor: { name: "Loan disbursed" },
                      },
                      cancellation_fee: { percentage: "5%" },
                      external_ref: {
                        mimetype: "text/html",
                        url: "https://icicibank.com/loan/tnc.html",
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary:
            "Borrower Confirms Loan and Authorizes Lender to Disburse Loan",
          api: "confirm",
          details: [
            {
              description:
                "The borrower acknowledges and validates the loan request, providing explicit consent to the lender to proceed with disbursing the Invoice Based Loan amount according to the agreed-upon terms and conditions.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                action: "confirm",
                timestamp: "2023-05-25T05:23:03.443Z",
                version: "1.1.0",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bap_id: "credit-protocol.becknprotocol.io",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
                ttl: "PT10M",
              },
              message: {
                order: {
                  provider: { id: "1" },
                  items: [
                    {
                      id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                      xinput: {
                        form_response: {
                          status: true,
                          submission_id: "c844d5f4-29c3-4398-b594-8b4716ef5dbf",
                        },
                      },
                    },
                  ],
                  fulfillments: [
                    {
                      stops: [
                        { authorization: { type: "OTP", token: "535346" } },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary:
            "Validates the borrower's loan application and approves the Invoice Based Loan.",
          api: "on_confirm",
          details: [
            {
              description:
                "Provider platform verifies the application and grants approval for the Invoice Based Loan. Upon successful validation, the lender proceeds with the loan disbursement process.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                version: "1.1.0",
                action: "on_confirm",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bap_id: "credit-protocol.becknprotocol.io",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                message_id: "0d30bfbf-87b8-43d2-8f95-36ebb9a24fd6",
                ttl: "PT10M",
                timestamp: "2023-05-25T05:23:03.443Z",
              },
              message: {
                order: {
                  id: "66B7AEDF45",
                  provider: {
                    id: "1",
                    descriptor: {
                      images: [
                        {
                          url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                          size_type: "sm",
                        },
                      ],
                      name: "ICICI Bank",
                      short_desc: "ICICI Bank Ltd",
                      long_desc: "ICICI Bank Ltd, India.",
                    },
                  },
                  items: [
                    {
                      id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                      descriptor: {
                        code: "invoice-based-loan",
                        name: "Invoice based Loan Offer: INR 2,00,000",
                      },
                      price: { currency: "INR", value: "231800" },
                      tags: [
                        {
                          descriptor: { name: "Invoice based loan terms" },
                          list: [
                            {
                              descriptor: {
                                name: "Interest Rate",
                                short_desc: "Rate of Interest (p.a)",
                              },
                              value: "12%",
                            },
                            {
                              descriptor: {
                                name: "Interest Type",
                                short_desc: "Type of Interest Rate",
                              },
                              value: "FLOATING",
                            },
                            {
                              descriptor: {
                                name: "Term",
                                short_desc: "Max Loan Term",
                              },
                              value: "5 months",
                            },
                            {
                              descriptor: {
                                name: "Foreclosure Penalty",
                                short_desc: "Loan Foreclosure Penalty",
                              },
                              value: "0.5%",
                            },
                            {
                              descriptor: {
                                name: "Delayed payments penalty",
                                short_desc: "Delayed payments penalty",
                              },
                              value: "5%",
                            },
                            {
                              descriptor: {
                                name: "Terms & Conditions",
                                short_desc: "Terms and Conditions",
                              },
                              value: "https://icicibank.com/loan/tnc.html",
                            },
                          ],
                          display: true,
                        },
                      ],
                    },
                  ],
                  quote: {
                    id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                    price: { currency: "INR", value: "231800" },
                    breakup: [
                      {
                        title: "Principal",
                        price: { value: "200000", currency: "INR" },
                      },
                      {
                        title: "Interest",
                        price: { value: "30000", currency: "INR" },
                      },
                      {
                        title: "Processing fee",
                        price: { value: "1800", currency: "INR" },
                      },
                    ],
                  },
                  fulfillments: [
                    {
                      customer: {
                        organization: {
                          address: "Industrial Park, Bangalore",
                          state: { name: "Karnataka" },
                          city: { name: "Bangalore", code: "560045" },
                          contact: {
                            phone: "+919876543210",
                            email: "alpha.manufacturing@gmail.com",
                          },
                        },
                      },
                      state: { descriptor: { name: "Loan Sanctioned" } },
                    },
                  ],
                  payments: [
                    {
                      type: "ON-ORDER",
                      url: "https://emandate.icicibank.in",
                      params: { amount: "46360", currency: "INR" },
                      status: "NOT-PAID",
                      time: {
                        range: {
                          start: "2023-06-01T00:00:00.000Z",
                          end: "2023-06-30T00:23:59.999Z",
                        },
                      },
                    },
                    {
                      params: { amount: "46360", currency: "INR" },
                      status: "NOT-PAID",
                      time: {
                        range: {
                          start: "2023-07-01T00:00:00.000Z",
                          end: "2023-07-31T00:23:59.999",
                        },
                      },
                    },
                    {
                      params: { amount: "46360", currency: "INR" },
                      status: "NOT-PAID",
                      time: {
                        range: {
                          start: "2023-08-01T00:00:00.000Z",
                          end: "2023-08-31T00:23:59.999",
                        },
                      },
                    },
                    {
                      params: { amount: "46360", currency: "INR" },
                      status: "NOT-PAID",
                      time: {
                        range: {
                          start: "2023-09-01T00:00:00.000Z",
                          end: "2023-09-30T00:23:59.999Z",
                        },
                      },
                    },
                    {
                      params: { amount: "46360", currency: "INR" },
                      status: "NOT-PAID",
                      time: {
                        range: {
                          start: "2023-10-01T00:00:00.000Z",
                          end: "2023-10-31T00:23:59.999",
                        },
                      },
                    },
                  ],
                  cancellation_terms: [
                    {
                      fulfillment_state: {
                        descriptor: { name: "Loan sanctioned" },
                      },
                      cancellation_fee: { percentage: "3%" },
                      external_ref: {
                        mimetype: "text/html",
                        url: "https://icicibank.com/loan/tnc.html",
                      },
                    },
                    {
                      fulfillment_state: {
                        descriptor: { name: "Loan disbursed" },
                      },
                      cancellation_fee: { percentage: "5%" },
                      external_ref: {
                        mimetype: "text/html",
                        url: "https://icicibank.com/loan/tnc.html",
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary:
            "Consumer platform request the latest updates on their Invoice Based Loan.",
          api: "status",
          details: [
            {
              description:
                "The consumer platform request the provider platform seeking the most recent information about the status of their Invoice Based Loan.",
            },
          ],
          reference: "if any",
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                action: "status",
                timestamp: "2023-05-25T05:23:03.443Z",
                version: "1.1.0",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bap_id: "credit-protocol.becknprotocol.io",
                ttl: "PT10M",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
              },
              message: { order_id: "66b7b9bad166-4a3f-ada6-ca063dc9d321" },
            },
          },
        },
        {
          summary:
            "Lender provides the borrower with real-time updates on their Invoice Based Loan after receiving the Equated Monthly Installments (EMI).",
          api: "on_status",
          details: [
            {
              description:
                "When the lender receives the Equated Monthly Installments (EMI) from the borrower, the on_status API delivers prompt updates to the borrower. These updates include the current status of the Invoice Based Loan, ensuring transparency and keeping the borrower informed throughout the loan repayment process.",
            },
          ],
          example: {
            value: {
              context: {
                domain: "financial-services:0.2.0",
                location: { country: { code: "IND" } },
                version: "1.1.0",
                action: "on_status",
                bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                bap_id: "credit-protocol.becknprotocol.io",
                bpp_id: "bpp.credit.icicibank.io",
                bpp_uri: "https://bpp.credit.icicibank.io",
                transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                message_id: "166a5633-66d2-4ec8-bdcb-65cfeb1e4697",
                ttl: "PT10M",
                timestamp: "2023-05-25T05:23:03.443Z",
              },
              message: {
                order: {
                  id: "66B7AEDF45",
                  provider: {
                    id: "1",
                    descriptor: {
                      images: [
                        {
                          url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                          size_type: "sm",
                        },
                      ],
                      name: "ICICI Bank",
                      short_desc: "ICICI Bank Ltd",
                      long_desc: "ICICI Bank Ltd, India.",
                    },
                  },
                  items: [
                    {
                      id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                      descriptor: {
                        code: "invoice-based-loan",
                        name: "Invoice Based Loan Offer: INR 2,00,000",
                      },
                      price: { currency: "INR", value: "231800" },
                      tags: [
                        {
                          descriptor: { name: "Invoice Based Loan terms" },
                          list: [
                            {
                              descriptor: {
                                name: "Interest Rate",
                                short_desc: "Rate of Interest (p.a)",
                              },
                              value: "12%",
                            },
                            {
                              descriptor: {
                                name: "Interest Type",
                                short_desc: "Type of Interest Rate",
                              },
                              value: "FLOATING",
                            },
                            {
                              descriptor: {
                                name: "Term",
                                short_desc: "Max Loan Term",
                              },
                              value: "5 months",
                            },
                            {
                              descriptor: {
                                name: "Foreclosure Penalty",
                                short_desc: "Loan Foreclosure Penalty",
                              },
                              value: "0.5%",
                            },
                            {
                              descriptor: {
                                name: "Delayed payments penalty",
                                short_desc: "Delayed payments penalty",
                              },
                              value: "5%",
                            },
                            {
                              descriptor: {
                                name: "Terms & Conditions",
                                short_desc: "Terms and Conditions",
                              },
                              value: "https://icicibank.com/loan/tnc.html",
                            },
                          ],
                          display: true,
                        },
                      ],
                    },
                  ],
                  quote: {
                    id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                    price: { currency: "INR", value: "231800" },
                    breakup: [
                      {
                        title: "Installment 1",
                        price: { value: "46360", currency: "INR" },
                      },
                      {
                        title: "Installment 2",
                        price: { value: "46360", currency: "INR" },
                      },
                      {
                        title: "Installment 3",
                        price: { value: "46360", currency: "INR" },
                      },
                      {
                        title: "Installment 4",
                        price: { value: "46360", currency: "INR" },
                      },
                      {
                        title: "Installment 5",
                        price: { value: "46360", currency: "INR" },
                      },
                    ],
                  },
                  fulfillments: [
                    {
                      customer: {
                        person: { name: "John Doe" },
                        contact: {
                          phone: "+91-9999999999",
                          email: "john.doe@example.com",
                        },
                      },
                      state: {
                        descriptor: { name: "Installment 1/5 received" },
                      },
                    },
                  ],
                  payments: [
                    {
                      url: "https://emandate.icicibank.in",
                      params: { amount: "231800", currency: "INR" },
                      status: "NOT-PAID",
                    },
                  ],
                  cancellation_terms: [
                    {
                      fulfillment_state: {
                        descriptor: { name: "Loan sanctioned" },
                      },
                      cancellation_fee: { percentage: "3%" },
                      external_ref: {
                        mimetype: "text/html",
                        url: "https://icicibank.com/loan/tnc.html",
                      },
                    },
                    {
                      fulfillment_state: {
                        descriptor: { name: "Loan disbursed" },
                      },
                      cancellation_fee: { percentage: "5%" },
                      external_ref: {
                        mimetype: "text/html",
                        url: "https://icicibank.com/loan/tnc.html",
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      ],
    },
  ],
  "x-examples": {
    "personal-loan": {
      summary: "personal-loan",
      description: "personal-loan",
      example_set: {
        search: {
          examples: [
            {
              summary: "search",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                  action: "search",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  version: "1.1.0",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  ttl: "PT10M",
                },
                message: {
                  intent: {
                    category: { descriptor: { code: "personal-loan" } },
                  },
                },
              },
            },
          ],
        },
        on_search: {
          examples: [
            {
              summary: "on_search",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  version: "1.1.0",
                  action: "on_search",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                  ttl: "PT30M",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                },
                message: {
                  catalog: {
                    descriptor: { name: "ICICI Bank" },
                    providers: [
                      {
                        id: "1",
                        descriptor: {
                          images: [
                            {
                              url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                              size_type: "sm",
                            },
                          ],
                          name: "ICICI Bank",
                          short_desc: "ICICI Bank Ltd",
                          long_desc: "ICICI Bank Ltd, India.",
                        },
                        categories: [
                          {
                            id: "101123",
                            descriptor: {
                              code: "personal-loan",
                              name: "Personal Loan",
                            },
                          },
                          {
                            id: "101124",
                            descriptor: { code: "car-loan", name: "Car Loan" },
                          },
                          {
                            id: "101125",
                            descriptor: {
                              code: "education-loan",
                              name: "Education Loan",
                            },
                          },
                        ],
                        items: [
                          {
                            id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                            descriptor: {
                              code: "personal-loan",
                              name: "Personal Loan",
                            },
                            category_ids: ["101123"],
                            tags: [
                              {
                                descriptor: {
                                  code: "general-info",
                                  name: "General Information",
                                },
                                list: [
                                  {
                                    descriptor: {
                                      name: "Interest Rate",
                                      short_desc:
                                        "Loans starting from 12% (p.a)",
                                    },
                                  },
                                ],
                                display: true,
                              },
                            ],
                            matched: true,
                            recommended: true,
                            xinput: {
                              head: {
                                descriptor: { name: "Customer Information" },
                                index: { min: 0, cur: 0, max: 0 },
                                headings: ["Personal Information"],
                              },
                              form: {
                                id: "d097c2f5-cb8d-42fe-900e-dfecdede16fb",
                                mime_type: "text/html",
                                url: "https://6vs8xnx5i7.icicibank.co.in/loans/xinput/formid/a23f2fdfbbb8ac402bf259d75",
                                resubmit: false,
                                multiple_sumbissions: false,
                              },
                              required: true,
                            },
                          },
                          {
                            id: "c8e3968c-cd78-4e46-aa34-0d541e46bd73",
                            descriptor: { code: "car-loan", name: "Car Loan" },
                            category_ids: ["101124"],
                            tags: [
                              {
                                descriptor: { name: "General Information" },
                                list: [
                                  {
                                    descriptor: {
                                      name: "Interest Rate",
                                      short_desc:
                                        "Loans starting from 9% (p.a)",
                                    },
                                  },
                                ],
                                display: true,
                              },
                            ],
                            matched: false,
                            xinput: {
                              head: {
                                descriptor: { name: "Customer Information" },
                                index: { min: 0, cur: 0, max: 0 },
                                headings: ["Personal Information"],
                              },
                              form: {
                                id: "d097c2f5-cb8d-42fe-900e-dfecdede16fb",
                                mime_type: "text/html",
                                url: "https://6vs8xnx5i7.icicibank.co.in/loans/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                                resubmit: false,
                                multiple_sumbissions: false,
                              },
                              required: true,
                            },
                          },
                          {
                            id: "80414936-a06d-49ae-9475-f99448c77014",
                            descriptor: {
                              code: "education-loan",
                              name: "Education Loan",
                            },
                            category_ids: ["101125"],
                            tags: [
                              {
                                descriptor: { name: "General Information" },
                                list: [
                                  {
                                    descriptor: {
                                      name: "Interest Rate",
                                      short_desc:
                                        "Loans starting from 12% (p.a)",
                                    },
                                  },
                                ],
                                display: true,
                              },
                            ],
                            matched: false,
                            xinput: {
                              head: {
                                descriptor: { name: "Customer Information" },
                                index: { min: 0, cur: 0, max: 0 },
                                headings: ["Personal Information"],
                              },
                              form: {
                                id: "d097c2f5-cb8d-42fe-900e-dfecdede16fb",
                                mime_type: "text/html",
                                url: "https://6vs8xnx5i7.icicibank.co.in/loans/xinput/formid/a23f2fdfbbb8ac402bf253fd",
                                resubmit: false,
                                multiple_sumbissions: false,
                              },
                              required: true,
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        select: {
          examples: [
            {
              summary: "select-request-personal-info",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                  action: "select",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  version: "1.1.0",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  ttl: "PT10M",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                },
                message: {
                  order: {
                    provider: { id: "1" },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        xinput: {
                          form_response: {
                            status: true,
                            submission_id:
                              "c844d5f4-29c3-4398-b594-8b4716ef5dbf",
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "select-request-employment-info",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                  action: "select",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  version: "1.1.0",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  ttl: "PT10M",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                },
                message: {
                  order: {
                    provider: { id: "1" },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        xinput: {
                          form_response: {
                            status: true,
                            submission_id:
                              "73ef9742-c17d-4c4e-92e3-b057960863af",
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "select-request-financial-info",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                  action: "select",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  version: "1.1.0",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  ttl: "PT10M",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                },
                message: {
                  order: {
                    provider: { id: "1" },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        xinput: {
                          form_response: {
                            status: true,
                            submission_id:
                              "cc9aa874-fcf9-4497-aa1d-33419134f9a2",
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        on_select: {
          examples: [
            {
              summary: "on_select-request-employment-details-form",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  action: "on_select",
                  version: "1.1.0",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62195",
                  message_id: "c8e3968c-cd78-4e46-aa34-0d541e46bd73",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  ttl: "P30M",
                },
                message: {
                  order: {
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "personal-loan",
                          name: "Personal Loan",
                        },
                        tags: [
                          {
                            descriptor: {
                              code: "general-info",
                              name: "General Information",
                            },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Loans starting from 12% (p.a)",
                                },
                              },
                            ],
                            display: true,
                          },
                        ],
                        xinput: {
                          head: {
                            descriptor: { name: "Customer Information" },
                            index: { min: 0, cur: 0, max: 2 },
                            headings: [
                              "Employment Information",
                              "Financial Information",
                              "Know your Customer",
                            ],
                          },
                          form: {
                            mime_type: "text/html",
                            url: "https://6vs8xnx5i7.icicibank.co.in/employment-details/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                            resubmit: false,
                            multiple_sumbissions: false,
                          },
                          required: true,
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "on_select-request-financial-info-form",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  action: "on_select",
                  version: "1.1.0",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62195",
                  message_id: "c8e3968c-cd78-4e46-aa34-0d541e46bd73",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  ttl: "P30M",
                },
                message: {
                  order: {
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "personal-loan",
                          name: "Personal Loan",
                        },
                        tags: [
                          {
                            descriptor: {
                              code: "general-info",
                              name: "General Information",
                            },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Loans starting from 12% (p.a)",
                                },
                              },
                            ],
                            display: true,
                          },
                        ],
                        xinput: {
                          head: {
                            descriptor: { name: "Customer Information" },
                            index: { min: 0, cur: 1, max: 2 },
                            headings: [
                              "Employment Information",
                              "Financial Information",
                              "Know your Customer",
                            ],
                          },
                          form: {
                            mime_type: "text/html",
                            url: "https://6vs8xnx5i7.icicibank.co.in/loans-details/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                            resubmit: false,
                            multiple_sumbissions: false,
                          },
                          required: true,
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "on_select-request-with-kyc-form",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  action: "on_select",
                  version: "1.1.0",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62195",
                  message_id: "c8e3968c-cd78-4e46-aa34-0d541e46bd73",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  ttl: "P30M",
                },
                message: {
                  order: {
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "personal-loan",
                          name: "Personal Loan Offer: INR 2,00,000",
                        },
                        tags: [
                          {
                            descriptor: { name: "Personal loan terms" },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Rate of Interest (p.a)",
                                },
                                value: "12%",
                              },
                              {
                                descriptor: {
                                  name: "Interest Type",
                                  short_desc: "Type of Interest Rate",
                                },
                                value: "FLOATING",
                              },
                              {
                                descriptor: {
                                  name: "Term",
                                  short_desc: "Max Loan Term",
                                },
                                value: "5 months",
                              },
                              {
                                descriptor: {
                                  name: "Foreclosure Penalty",
                                  short_desc: "Loan Foreclosure Penalty",
                                },
                                value: "0.5%",
                              },
                              {
                                descriptor: {
                                  name: "Delayed payments penalty",
                                  short_desc: "Delayed payments penalty",
                                },
                                value: "5%",
                              },
                              {
                                descriptor: {
                                  name: "Terms & Conditions",
                                  short_desc: "Terms and Conditions",
                                },
                                value: "https://icicibank.com/loan/tnc.html",
                              },
                            ],
                            display: true,
                          },
                        ],
                        xinput: {
                          head: {
                            descriptor: { name: "Customer Information" },
                            index: { min: 0, cur: 2, max: 2 },
                            headings: [
                              "Employment Information",
                              "Financial Information",
                              "Know your Customer",
                            ],
                          },
                          form: {
                            mime_type: "text/html",
                            url: "https://6vs8xnx5i7.icicibank.co.in/loans-kyc/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                            resubmit: false,
                            multiple_sumbissions: false,
                          },
                          required: true,
                        },
                      },
                    ],
                    quote: {
                      id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                      price: { currency: "INR", value: "171800" },
                      breakup: [
                        {
                          title: "Principal",
                          price: { value: "150000", currency: "INR" },
                        },
                        {
                          title: "Interest",
                          price: { value: "20000", currency: "INR" },
                        },
                        {
                          title: "Processing fee",
                          price: { value: "1800", currency: "INR" },
                        },
                      ],
                    },
                  },
                },
              },
            },
          ],
        },
        init: {
          examples: [
            {
              summary: "init",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  version: "1.1.0",
                  action: "init",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "0d30bfbf-87b8-43d2-8f95-36ebb9a24fd6",
                  ttl: "PT10M",
                  timestamp: "2023-05-25T05:23:03.443Z",
                },
                message: {
                  order: {
                    provider: { id: "1" },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        xinput: {
                          form_response: {
                            status: true,
                            submission_id:
                              "73ef9742-c17d-4c4e-92e3-b057960863af",
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "init-request-account-info-complete",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  version: "1.1.0",
                  action: "init",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "0d30bfbf-87b8-43d2-8f95-36ebb9a24fd6",
                  ttl: "PT10M",
                  timestamp: "2023-05-25T05:23:03.443Z",
                },
                message: {
                  order: {
                    provider: { id: "1" },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        xinput: {
                          form_response: {
                            status: true,
                            submission_id:
                              "73ef9742-c17d-4c4e-92e3-b057960863af",
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        on_init: {
          examples: [
            {
              summary: "on_init-request-loan-agreement-form",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  version: "1.1.0",
                  action: "on_init",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "166a5633-66d2-4ec8-bdcb-65cfeb1e4697",
                  ttl: "PT10M",
                  timestamp: "2023-05-25T05:23:03.443Z",
                },
                message: {
                  order: {
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "personal-loan",
                          name: "Personal Loan Offer: INR 2,00,000",
                        },
                        price: { currency: "INR", value: "231800" },
                        tags: [
                          {
                            descriptor: { name: "Personal loan terms" },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Rate of Interest (p.a)",
                                },
                                value: "12%",
                              },
                              {
                                descriptor: {
                                  name: "Interest Type",
                                  short_desc: "Type of Interest Rate",
                                },
                                value: "FLOATING",
                              },
                              {
                                descriptor: {
                                  name: "Term",
                                  short_desc: "Max Loan Term",
                                },
                                value: "5 months",
                              },
                              {
                                descriptor: {
                                  name: "Foreclosure Penalty",
                                  short_desc: "Loan Foreclosure Penalty",
                                },
                                value: "0.5%",
                              },
                              {
                                descriptor: {
                                  name: "Delayed payments penalty",
                                  short_desc: "Delayed payments penalty",
                                },
                                value: "5%",
                              },
                              {
                                descriptor: {
                                  name: "Terms & Conditions",
                                  short_desc: "Terms and Conditions",
                                },
                                value: "https://icicibank.com/loan/tnc.html",
                              },
                            ],
                            display: true,
                          },
                        ],
                        xinput: {
                          head: {
                            descriptor: { name: "Account Information" },
                            index: { min: 0, cur: 1, max: 1 },
                            headings: ["Account Information", "Loan Agreement"],
                          },
                          form: {
                            mime_type: "text/html",
                            url: "https://6vs8xnx5i7.icicibank.co.in/loan-agreement/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                            resubmit: false,
                            multiple_sumbissions: false,
                          },
                          required: true,
                        },
                      },
                    ],
                    quote: {
                      id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                      price: { currency: "INR", value: "231800" },
                      breakup: [
                        {
                          title: "Principal",
                          price: { value: "200000", currency: "INR" },
                        },
                        {
                          title: "Interest",
                          price: { value: "30000", currency: "INR" },
                        },
                        {
                          title: "Processing fee",
                          price: { value: "1800", currency: "INR" },
                        },
                      ],
                    },
                    fulfillments: [
                      {
                        customer: {
                          person: { name: "John Doe" },
                          contact: {
                            phone: "+91-9999999999",
                            email: "john.doe@example.com",
                          },
                        },
                        stops: [{ authorization: { type: "OTP" } }],
                        state: { descriptor: { name: "Loan Initiated" } },
                      },
                    ],
                    payments: [
                      {
                        type: "ON-ORDER",
                        url: "https://emandate.icicibank.in",
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-06-01T00:00:00.000Z",
                            end: "2023-06-30T23:59:59.999Z",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-07-01T00:00:00.000Z",
                            end: "2023-07-31T23:59:59.999Z",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-08-01T00:00:00.000Z",
                            end: "2023-08-31T23:59:59.999Z",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-09-01T00:00:00.000Z",
                            end: "2023-09-30T23:59:59.999Z",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-10-01T00:00:00.000Z",
                            end: "2023-10-31T23:59:59.999Z",
                          },
                        },
                      },
                    ],
                    cancellation_terms: [
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan sanctioned" },
                        },
                        cancellation_fee: { percentage: "3%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan disbursed" },
                        },
                        cancellation_fee: { percentage: "5%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "on_init-request-loan-agreement-form",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  version: "1.1.0",
                  action: "on_init",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "166a5633-66d2-4ec8-bdcb-65cfeb1e4697",
                  ttl: "PT10M",
                  timestamp: "2023-05-25T05:23:03.443Z",
                },
                message: {
                  order: {
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "personal-loan",
                          name: "Personal Loan Offer: INR 2,00,000",
                        },
                        price: { currency: "INR", value: "231800" },
                        tags: [
                          {
                            descriptor: { name: "Personal loan terms" },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Rate of Interest (p.a)",
                                },
                                value: "12%",
                              },
                              {
                                descriptor: {
                                  name: "Interest Type",
                                  short_desc: "Type of Interest Rate",
                                },
                                value: "FLOATING",
                              },
                              {
                                descriptor: {
                                  name: "Term",
                                  short_desc: "Max Loan Term",
                                },
                                value: "5 months",
                              },
                              {
                                descriptor: {
                                  name: "Foreclosure Penalty",
                                  short_desc: "Loan Foreclosure Penalty",
                                },
                                value: "0.5%",
                              },
                              {
                                descriptor: {
                                  name: "Delayed payments penalty",
                                  short_desc: "Delayed payments penalty",
                                },
                                value: "5%",
                              },
                              {
                                descriptor: {
                                  name: "Terms & Conditions",
                                  short_desc: "Terms and Conditions",
                                },
                                value: "https://icicibank.com/loan/tnc.html",
                              },
                            ],
                            display: true,
                          },
                        ],
                        xinput: {
                          head: {
                            descriptor: { name: "Account Information" },
                            index: { min: 0, cur: 1, max: 1 },
                            headings: ["Account Information", "Loan Agreement"],
                          },
                          form: {
                            mime_type: "text/html",
                            url: "https://6vs8xnx5i7.icicibank.co.in/loan-agreement/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                            resubmit: false,
                            multiple_sumbissions: false,
                          },
                          required: true,
                        },
                      },
                    ],
                    quote: {
                      id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                      price: { currency: "INR", value: "231800" },
                      breakup: [
                        {
                          title: "Principal",
                          price: { value: "200000", currency: "INR" },
                        },
                        {
                          title: "Interest",
                          price: { value: "30000", currency: "INR" },
                        },
                        {
                          title: "Processing fee",
                          price: { value: "1800", currency: "INR" },
                        },
                      ],
                    },
                    fulfillments: [
                      {
                        customer: {
                          person: { name: "John Doe" },
                          contact: {
                            phone: "+91-9999999999",
                            email: "john.doe@example.com",
                          },
                        },
                        stops: [{ authorization: { type: "OTP" } }],
                        state: { descriptor: { name: "Loan Initiated" } },
                      },
                    ],
                    payments: [
                      {
                        type: "ON-ORDER",
                        url: "https://emandate.icicibank.in",
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-06-01T00:00:00.000Z",
                            end: "2023-06-30T23:59:59.999Z",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-07-01T00:00:00.000Z",
                            end: "2023-07-31T23:59:59.999Z",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-08-01T00:00:00.000Z",
                            end: "2023-08-31T23:59:59.999Z",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-09-01T00:00:00.000Z",
                            end: "2023-09-30T23:59:59.999Z",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-10-01T00:00:00.000Z",
                            end: "2023-10-31T23:59:59.999Z",
                          },
                        },
                      },
                    ],
                    cancellation_terms: [
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan sanctioned" },
                        },
                        cancellation_fee: { percentage: "3%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan disbursed" },
                        },
                        cancellation_fee: { percentage: "5%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        confirm: {
          examples: [
            {
              summary: "confirm",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                  action: "confirm",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  version: "1.1.0",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  ttl: "PT10M",
                },
                message: {
                  order: {
                    provider: { id: "1" },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        xinput: {
                          form_response: {
                            status: true,
                            submission_id:
                              "c844d5f4-29c3-4398-b594-8b4716ef5dbf",
                          },
                        },
                      },
                    ],
                    fulfillments: [
                      {
                        stops: [
                          { authorization: { type: "OTP", token: "535346" } },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        on_confirm: {
          examples: [
            {
              summary: "on_confirm",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  version: "1.1.0",
                  action: "on_confirm",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "166a5633-66d2-4ec8-bdcb-65cfeb1e4697",
                  ttl: "PT10M",
                  timestamp: "2023-05-25T05:23:03.443Z",
                },
                message: {
                  order: {
                    id: "66B7AEDF45",
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "personal-loan",
                          name: "Personal Loan Offer: INR 2,00,000",
                        },
                        price: { currency: "INR", value: "231800" },
                        tags: [
                          {
                            descriptor: { name: "Personal loan terms" },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Rate of Interest (p.a)",
                                },
                                value: "12%",
                              },
                              {
                                descriptor: {
                                  name: "Interest Type",
                                  short_desc: "Type of Interest Rate",
                                },
                                value: "FLOATING",
                              },
                              {
                                descriptor: {
                                  name: "Term",
                                  short_desc: "Max Loan Term",
                                },
                                value: "5 months",
                              },
                              {
                                descriptor: {
                                  name: "Foreclosure Penalty",
                                  short_desc: "Loan Foreclosure Penalty",
                                },
                                value: "0.5%",
                              },
                              {
                                descriptor: {
                                  name: "Delayed payments penalty",
                                  short_desc: "Delayed payments penalty",
                                },
                                value: "5%",
                              },
                              {
                                descriptor: {
                                  name: "Terms & Conditions",
                                  short_desc: "Terms and Conditions",
                                },
                                value: "https://icicibank.com/loan/tnc.html",
                              },
                            ],
                            display: true,
                          },
                        ],
                      },
                    ],
                    quote: {
                      id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                      price: { currency: "INR", value: "231800" },
                      breakup: [
                        {
                          title: "Principal",
                          price: { value: "200000", currency: "INR" },
                        },
                        {
                          title: "Interest",
                          price: { value: "30000", currency: "INR" },
                        },
                        {
                          title: "Processing fee",
                          price: { value: "1800", currency: "INR" },
                        },
                      ],
                    },
                    fulfillments: [
                      {
                        customer: {
                          person: { name: "John Doe" },
                          contact: {
                            phone: "+91-9999999999",
                            email: "john.doe@example.com",
                          },
                        },
                        state: { descriptor: { name: "Loan Sanctioned" } },
                      },
                    ],
                    payments: [
                      {
                        type: "ON-ORDER",
                        url: "https://emandate.icicibank.in",
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-06-01T00:00:00.000Z",
                            end: "2023-06-30T23:59:59.999Z",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-07-01T00:00:00.000Z",
                            end: "2023-07-31T23:59:59.999Z",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-08-01T00:00:00.000Z",
                            end: "2023-08-31T23:59:59.999Z",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-09-01T00:00:00.000Z",
                            end: "2023-09-30T23:59:59.999Z",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-10-01T00:00:00.000Z",
                            end: "2023-10-30T23:59:59.999Z",
                          },
                        },
                      },
                    ],
                    cancellation_terms: [
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan sanctioned" },
                        },
                        cancellation_fee: { percentage: "3%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan disbursed" },
                        },
                        cancellation_fee: { percentage: "5%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        update: {
          examples: [
            {
              summary: "update",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                  action: "update",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  version: "1.1.0",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  ttl: "PT10M",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                },
                message: {
                  update_target: "fulfillment",
                  order: {
                    id: "66B7AEDF45",
                    fulfillments: [
                      {
                        customer: {
                          person: { name: "John Doe" },
                          contact: {
                            phone: "+91-9876543210",
                            email: "john.doe@gmail.com",
                          },
                        },
                        state: {
                          descriptor: { name: "Loan application updated" },
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        on_update: {
          examples: [
            {
              summary: "on_update",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  version: "1.1.0",
                  action: "on_update",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "0d30bfbf-87b8-43d2-8f95-36ebb9a24fd6",
                  ttl: "PT10M",
                  timestamp: "2023-05-25T05:23:03.443Z",
                },
                message: {
                  order: {
                    id: "66B7AEDF45",
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "personal-loan",
                          name: "Personal Loan Offer: INR 2,00,000",
                        },
                        price: { currency: "INR", value: "231800" },
                        tags: [
                          {
                            descriptor: { name: "Personal loan terms" },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Rate of Interest (p.a)",
                                },
                                value: "12%",
                              },
                              {
                                descriptor: {
                                  name: "Interest Type",
                                  short_desc: "Type of Interest Rate",
                                },
                                value: "FLOATING",
                              },
                              {
                                descriptor: {
                                  name: "Term",
                                  short_desc: "Max Loan Term",
                                },
                                value: "5 months",
                              },
                              {
                                descriptor: {
                                  name: "Foreclosure Penalty",
                                  short_desc: "Loan Foreclosure Penalty",
                                },
                                value: "0.5%",
                              },
                              {
                                descriptor: {
                                  name: "Delayed payments penalty",
                                  short_desc: "Delayed payments penalty",
                                },
                                value: "5%",
                              },
                              {
                                descriptor: {
                                  name: "Terms & Conditions",
                                  short_desc: "Terms and Conditions",
                                },
                                value: "https://icicibank.com/loan/tnc.html",
                              },
                            ],
                            display: true,
                          },
                        ],
                      },
                    ],
                    quote: {
                      id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                      price: { currency: "INR", value: "231800" },
                      breakup: [
                        {
                          title: "Installment 1",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 2",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 3",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 4",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 5",
                          price: { value: "46360", currency: "INR" },
                        },
                      ],
                    },
                    fulfillments: [
                      {
                        customer: {
                          person: { name: "John Doe" },
                          contact: {
                            phone: "+91-9999999999",
                            email: "john.doe@example.com",
                          },
                        },
                        state: {
                          descriptor: { name: "Loan application updated" },
                        },
                      },
                    ],
                    payments: [
                      {
                        url: "https://emandate.icicibank.in",
                        params: { amount: "185440", currency: "INR" },
                        status: "NOT-PAID",
                      },
                    ],
                    cancellation_terms: [
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan sanctioned" },
                        },
                        cancellation_fee: { percentage: "3%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan disbursed" },
                        },
                        cancellation_fee: { percentage: "5%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        status: {
          examples: [
            {
              summary: "status",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                  action: "status",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  version: "1.1.0",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  ttl: "PT10M",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                },
                message: { order_id: "66b7b9bad166-4a3f-ada6-ca063dc9d321" },
              },
            },
          ],
        },
        on_status: {
          examples: [
            {
              summary: "on_status",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  version: "1.1.0",
                  action: "on_status",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "166a5633-66d2-4ec8-bdcb-65cfeb1e4697",
                  ttl: "PT10M",
                  timestamp: "2023-05-25T05:23:03.443Z",
                },
                message: {
                  order: {
                    id: "66B7AEDF45",
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "personal-loan",
                          name: "Personal Loan Offer: INR 2,00,000",
                        },
                        price: { currency: "INR", value: "231800" },
                        tags: [
                          {
                            descriptor: { name: "Personal loan terms" },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Rate of Interest (p.a)",
                                },
                                value: "12%",
                              },
                              {
                                descriptor: {
                                  name: "Interest Type",
                                  short_desc: "Type of Interest Rate",
                                },
                                value: "FLOATING",
                              },
                              {
                                descriptor: {
                                  name: "Term",
                                  short_desc: "Max Loan Term",
                                },
                                value: "5 months",
                              },
                              {
                                descriptor: {
                                  name: "Foreclosure Penalty",
                                  short_desc: "Loan Foreclosure Penalty",
                                },
                                value: "0.5%",
                              },
                              {
                                descriptor: {
                                  name: "Delayed payments penalty",
                                  short_desc: "Delayed payments penalty",
                                },
                                value: "5%",
                              },
                              {
                                descriptor: {
                                  name: "Terms & Conditions",
                                  short_desc: "Terms and Conditions",
                                },
                                value: "https://icicibank.com/loan/tnc.html",
                              },
                            ],
                            display: true,
                          },
                        ],
                      },
                    ],
                    quote: {
                      id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                      price: { currency: "INR", value: "231800" },
                      breakup: [
                        {
                          title: "Installment 1",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 2",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 3",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 4",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 5",
                          price: { value: "46360", currency: "INR" },
                        },
                      ],
                    },
                    fulfillments: [
                      {
                        customer: {
                          person: { name: "John Doe" },
                          contact: {
                            phone: "+91-9999999999",
                            email: "john.doe@example.com",
                          },
                        },
                        state: { descriptor: { name: "Loan Disbursed" } },
                      },
                    ],
                    payments: [
                      {
                        url: "https://emandate.icicibank.in",
                        params: { amount: "185440", currency: "INR" },
                        status: "NOT-PAID",
                      },
                    ],
                    cancellation_terms: [
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan sanctioned" },
                        },
                        cancellation_fee: { percentage: "3%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan disbursed" },
                        },
                        cancellation_fee: { percentage: "5%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "on_status-request-after-installment",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  version: "1.1.0",
                  action: "on_status",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "166a5633-66d2-4ec8-bdcb-65cfeb1e4697",
                  ttl: "PT10M",
                  timestamp: "2023-05-25T05:23:03.443Z",
                },
                message: {
                  order: {
                    id: "66B7AEDF45",
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "personal-loan",
                          name: "Personal Loan Offer: INR 2,00,000",
                        },
                        price: { currency: "INR", value: "231800" },
                        tags: [
                          {
                            descriptor: { name: "Personal loan terms" },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Rate of Interest (p.a)",
                                },
                                value: "12%",
                              },
                              {
                                descriptor: {
                                  name: "Interest Type",
                                  short_desc: "Type of Interest Rate",
                                },
                                value: "FLOATING",
                              },
                              {
                                descriptor: {
                                  name: "Term",
                                  short_desc: "Max Loan Term",
                                },
                                value: "5 months",
                              },
                              {
                                descriptor: {
                                  name: "Foreclosure Penalty",
                                  short_desc: "Loan Foreclosure Penalty",
                                },
                                value: "0.5%",
                              },
                              {
                                descriptor: {
                                  name: "Delayed payments penalty",
                                  short_desc: "Delayed payments penalty",
                                },
                                value: "5%",
                              },
                              {
                                descriptor: {
                                  name: "Terms & Conditions",
                                  short_desc: "Terms and Conditions",
                                },
                                value: "https://icicibank.com/loan/tnc.html",
                              },
                            ],
                            display: true,
                          },
                        ],
                      },
                    ],
                    quote: {
                      id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                      price: { currency: "INR", value: "231800" },
                      breakup: [
                        {
                          title: "Installment 1",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 2",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 3",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 4",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 5",
                          price: { value: "46360", currency: "INR" },
                        },
                      ],
                    },
                    fulfillments: [
                      {
                        customer: {
                          person: { name: "John Doe" },
                          contact: {
                            phone: "+91-9999999999",
                            email: "john.doe@example.com",
                          },
                        },
                        state: {
                          descriptor: { name: "Installment 1/5 received" },
                        },
                      },
                    ],
                    payments: [
                      {
                        url: "https://emandate.icicibank.in",
                        params: { amount: "231800", currency: "INR" },
                        status: "NOT-PAID",
                      },
                    ],
                    cancellation_terms: [
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan sanctioned" },
                        },
                        cancellation_fee: { percentage: "3%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan disbursed" },
                        },
                        cancellation_fee: { percentage: "5%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "on_status-request-full-repayment",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  version: "1.1.0",
                  action: "on_status",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "166a5633-66d2-4ec8-bdcb-65cfeb1e4697",
                  ttl: "PT10M",
                  timestamp: "2023-05-25T05:23:03.443Z",
                },
                message: {
                  order: {
                    id: "66B7AEDF45",
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "personal-loan",
                          name: "Personal Loan Offer: INR 2,00,000",
                        },
                        price: { currency: "INR", value: "231800" },
                        tags: [
                          {
                            descriptor: { name: "Personal loan terms" },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Rate of Interest (p.a)",
                                },
                                value: "12%",
                              },
                              {
                                descriptor: {
                                  name: "Interest Type",
                                  short_desc: "Type of Interest Rate",
                                },
                                value: "FLOATING",
                              },
                              {
                                descriptor: {
                                  name: "Term",
                                  short_desc: "Max Loan Term",
                                },
                                value: "5 months",
                              },
                              {
                                descriptor: {
                                  name: "Foreclosure Penalty",
                                  short_desc: "Loan Foreclosure Penalty",
                                },
                                value: "0.5%",
                              },
                              {
                                descriptor: {
                                  name: "Delayed payments penalty",
                                  short_desc: "Delayed payments penalty",
                                },
                                value: "5%",
                              },
                              {
                                descriptor: {
                                  name: "Terms & Conditions",
                                  short_desc: "Terms and Conditions",
                                },
                                value: "https://icicibank.com/loan/tnc.html",
                              },
                            ],
                            display: true,
                          },
                        ],
                      },
                    ],
                    quote: {
                      id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                      price: { currency: "INR", value: "231800" },
                      breakup: [
                        {
                          title: "Installment 1",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 2",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 3",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 4",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 5",
                          price: { value: "46360", currency: "INR" },
                        },
                      ],
                    },
                    fulfillments: [
                      {
                        customer: {
                          person: { name: "John Doe" },
                          contact: {
                            phone: "+91-9999999999",
                            email: "john.doe@example.com",
                          },
                        },
                        state: {
                          descriptor: { name: "Installment 5/5 received" },
                        },
                      },
                    ],
                    payments: [
                      {
                        url: "https://emandate.icicibank.in",
                        params: { amount: "0", currency: "INR" },
                        status: "PAID",
                      },
                    ],
                    cancellation_terms: [
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan sanctioned" },
                        },
                        cancellation_fee: { percentage: "3%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan disbursed" },
                        },
                        cancellation_fee: { percentage: "5%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "on_status-request-late-repayment-installment",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  version: "1.1.0",
                  action: "on_status",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "166a5633-66d2-4ec8-bdcb-65cfeb1e4697",
                  ttl: "PT10M",
                  timestamp: "2023-05-25T05:23:03.443Z",
                },
                message: {
                  order: {
                    id: "66B7AEDF45",
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "personal-loan",
                          name: "Personal Loan Offer: INR 2,00,000",
                        },
                        price: { currency: "INR", value: "231800" },
                        tags: [
                          {
                            descriptor: { name: "Personal loan terms" },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Rate of Interest (p.a)",
                                },
                                value: "12%",
                              },
                              {
                                descriptor: {
                                  name: "Interest Type",
                                  short_desc: "Type of Interest Rate",
                                },
                                value: "FLOATING",
                              },
                              {
                                descriptor: {
                                  name: "Term",
                                  short_desc: "Max Loan Term",
                                },
                                value: "5 months",
                              },
                              {
                                descriptor: {
                                  name: "Foreclosure Penalty",
                                  short_desc: "Loan Foreclosure Penalty",
                                },
                                value: "0.5%",
                              },
                              {
                                descriptor: {
                                  name: "Delayed payments penalty",
                                  short_desc: "Delayed payments penalty",
                                },
                                value: "5%",
                              },
                              {
                                descriptor: {
                                  name: "Terms & Conditions",
                                  short_desc: "Terms and Conditions",
                                },
                                value: "https://icicibank.com/loan/tnc.html",
                              },
                            ],
                            display: true,
                          },
                        ],
                      },
                    ],
                    quote: {
                      id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                      price: { currency: "INR", value: "231800" },
                      breakup: [
                        {
                          title: "Late fee for the month of August",
                          price: { value: "4636", currency: "INR" },
                        },
                        {
                          title: "Installment 1",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 2",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 3",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 4",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 5",
                          price: { value: "46360", currency: "INR" },
                        },
                      ],
                    },
                    fulfillments: [
                      {
                        customer: {
                          person: { name: "John Doe" },
                          contact: {
                            phone: "+91-9999999999",
                            email: "john.doe@example.com",
                          },
                        },
                        state: {
                          descriptor: { name: "Installment 1/5 received" },
                        },
                      },
                    ],
                    payments: [
                      {
                        url: "https://emandate.icicibank.in",
                        params: { amount: "236160", currency: "INR" },
                        status: "NOT-PAID",
                      },
                    ],
                    cancellation_terms: [
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan sanctioned" },
                        },
                        cancellation_fee: { percentage: "3%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan disbursed" },
                        },
                        cancellation_fee: { percentage: "5%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        cancel: {
          examples: [
            {
              summary: "cancel",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                  action: "cancel",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  version: "1.1.0",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  ttl: "PT10M",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                },
                message: {
                  order_id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                  cancellation_reason_id: "5",
                  descriptor: { short_desc: "Loss of employment" },
                },
              },
            },
          ],
        },
        on_cancel: {
          examples: [
            {
              summary: "on_cancel",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  version: "1.1.0",
                  action: "on_cancel",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "166a5633-66d2-4ec8-bdcb-65cfeb1e4697",
                  ttl: "PT10M",
                  timestamp: "2023-05-25T05:23:03.443Z",
                },
                message: {
                  order: {
                    id: "66B7AEDF45",
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "personal-loan",
                          name: "Personal Loan Offer: INR 2,00,000",
                        },
                        price: { currency: "INR", value: "231800" },
                        tags: [
                          {
                            descriptor: { name: "Personal loan terms" },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Rate of Interest (p.a)",
                                },
                                value: "12%",
                              },
                              {
                                descriptor: {
                                  name: "Interest Type",
                                  short_desc: "Type of Interest Rate",
                                },
                                value: "FLOATING",
                              },
                              {
                                descriptor: {
                                  name: "Term",
                                  short_desc: "Max Loan Term",
                                },
                                value: "5 months",
                              },
                              {
                                descriptor: {
                                  name: "Foreclosure Penalty",
                                  short_desc: "Loan Foreclosure Penalty",
                                },
                                value: "0.5%",
                              },
                              {
                                descriptor: {
                                  name: "Delayed payments penalty",
                                  short_desc: "Delayed payments penalty",
                                },
                                value: "5%",
                              },
                              {
                                descriptor: {
                                  name: "Terms & Conditions",
                                  short_desc: "Terms and Conditions",
                                },
                                value: "https://icicibank.com/loan/tnc.html",
                              },
                            ],
                            display: true,
                          },
                        ],
                      },
                    ],
                    quote: {
                      id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                      price: { currency: "INR", value: "231800" },
                      breakup: [
                        {
                          title: "Installment 1",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 2",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 3",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 4",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 5",
                          price: { value: "46360", currency: "INR" },
                        },
                      ],
                    },
                    fulfillments: [
                      {
                        customer: {
                          person: { name: "John Doe" },
                          contact: {
                            phone: "+91-9999999999",
                            email: "john.doe@example.com",
                          },
                        },
                        state: { descriptor: { name: "Loan Cancelled" } },
                      },
                    ],
                    payments: [
                      {
                        url: "https://emandate.icicibank.in",
                        params: { amount: "185440", currency: "INR" },
                        status: "NOT-PAID",
                      },
                    ],
                    cancellation_terms: [
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan sanctioned" },
                        },
                        cancellation_fee: { percentage: "3%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan disbursed" },
                        },
                        cancellation_fee: { percentage: "5%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        support: {
          examples: [
            {
              summary: "support",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                  action: "support",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  version: "1.1.0",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  ttl: "PT10M",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                },
                message: {
                  support: {
                    order_id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                    phone: "+919876543210",
                    email: "john.doe@gmail.com",
                  },
                },
              },
            },
          ],
        },
        on_support: {
          examples: [
            {
              summary: "on_support",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                  action: "on_support",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  version: "1.1.0",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  ttl: "PT10M",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                },
                message: {
                  support: {
                    order_id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                    phone: "1800 1080",
                    email: "customer.care@icicibank.com",
                    url: "https://www.icicibank.com/helpdesk",
                  },
                },
              },
            },
          ],
        },
      },
    },
    "invoice-based-loans": {
      summary: "invoice-based-loans",
      description: "invoice-based-loans",
      example_set: {
        search: {
          examples: [
            {
              summary: "search",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                  action: "search",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  version: "1.1.0",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  ttl: "PT10M",
                },
                message: {
                  intent: {
                    category: { descriptor: { code: "invoice-based-loan" } },
                  },
                },
              },
            },
          ],
        },
        on_search: {
          examples: [
            {
              summary: "on_search",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  version: "1.1.0",
                  action: "on_search",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                  ttl: "PT30M",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                },
                message: {
                  catalog: {
                    descriptor: { name: "ICICI Bank" },
                    providers: [
                      {
                        id: "1",
                        descriptor: {
                          images: [
                            {
                              url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                              size_type: "sm",
                            },
                          ],
                          name: "ICICI Bank",
                          short_desc: "ICICI Bank Ltd",
                          long_desc: "ICICI Bank Ltd, India.",
                        },
                        categories: [
                          {
                            id: "101123",
                            descriptor: {
                              code: "invoice-based-loan",
                              name: "Invoice based loan",
                            },
                          },
                        ],
                        items: [
                          {
                            id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                            descriptor: {
                              code: "invoice-based-loan",
                              name: "Invoice based Loan",
                            },
                            category_ids: ["101123"],
                            tags: [
                              {
                                descriptor: {
                                  code: "general-info",
                                  name: "General Information",
                                },
                                list: [
                                  {
                                    descriptor: {
                                      name: "Interest Rate",
                                      short_desc:
                                        "Loans starting from 12% (p.a)",
                                    },
                                  },
                                ],
                                display: true,
                              },
                            ],
                            matched: true,
                            recommended: true,
                            xinput: {
                              head: {
                                descriptor: { name: "Customer Information" },
                                index: { min: 0, cur: 0, max: 0 },
                                headings: ["Organization Information"],
                              },
                              form: {
                                id: "d097c2f5-cb8d-42fe-900e-dfecdede16fb",
                                mime_type: "text/html",
                                url: "https://6vs8xnx5i7.icicibank.co.in/loans/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                                resubmit: false,
                                multiple_sumbissions: false,
                              },
                              required: true,
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        select: {
          examples: [
            {
              summary: "select-request-personal-info",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                  action: "select",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  version: "1.1.0",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  ttl: "PT10M",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                },
                message: {
                  order: {
                    provider: { id: "1" },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        xinput: {
                          form_response: {
                            status: true,
                            submission_id:
                              "c844d5f4-29c3-4398-b594-8b4716ef5dbf",
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "select-request-employment-info",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                  action: "select",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  version: "1.1.0",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  ttl: "PT10M",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                },
                message: {
                  order: {
                    provider: { id: "1" },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        xinput: {
                          form_response: {
                            status: true,
                            submission_id:
                              "242ea230-2b57-4126-bd21-5929325de465",
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "select-request-financial-info",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                  action: "select",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  version: "1.1.0",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  ttl: "PT10M",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                },
                message: {
                  order: {
                    provider: { id: "1" },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        xinput: {
                          form_response: {
                            status: true,
                            submission_id:
                              "c844d5f4-29c3-4398-b594-8b4716ef5dbf",
                          },
                        },
                        tags: [
                          {
                            descriptor: {
                              name: "GSTIN_PROFILE",
                              long_desc: "GST Profile",
                            },
                            list: [
                              {
                                descriptor: { name: "GSTR1" },
                                value:
                                  "H4sICPsdulsCAHJlYWRtZS50eHQAC0/NSc7PTVUoyVdISixONTPRSy8tKlUEAPCdUNYXAAAA",
                              },
                              {
                                descriptor: { name: "GSTR2A" },
                                value:
                                  "H4sICPsdulsCAHJlYWRtZS50eHQAC0/NSc7PTVUoyVdISixONTPRSy8tKlUEAPCdUNYXAAAA",
                              },
                              {
                                descriptor: { name: "GSTR3B" },
                                value:
                                  "JlYWRtZS50eHQAC0/NSc7PTVUoyVdISixONTPRSy8tKlUEAPCdUNYXAAAA",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        on_select: {
          examples: [
            {
              summary: "on_select-request-employment-details-form",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  action: "on_select",
                  version: "1.1.0",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62195",
                  message_id: "c8e3968c-cd78-4e46-aa34-0d541e46bd73",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  ttl: "P30M",
                },
                message: {
                  order: {
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "invoice-based-loan",
                          name: "Invoice Based Loan Offer: INR 2,00,000",
                        },
                        tags: [
                          {
                            descriptor: { name: "Invoice based loan terms" },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Rate of Interest (p.a)",
                                },
                                value: "12%",
                              },
                              {
                                descriptor: {
                                  name: "Interest Type",
                                  short_desc: "Type of Interest Rate",
                                },
                                value: "FLOATING",
                              },
                              {
                                descriptor: {
                                  name: "Term",
                                  short_desc: "Max Loan Term",
                                },
                                value: "5 months",
                              },
                              {
                                descriptor: {
                                  name: "Foreclosure Penalty",
                                  short_desc: "Loan Foreclosure Penalty",
                                },
                                value: "0.5%",
                              },
                              {
                                descriptor: {
                                  name: "Delayed payments penalty",
                                  short_desc: "Delayed payments penalty",
                                },
                                value: "5%",
                              },
                              {
                                descriptor: {
                                  name: "Terms & Conditions",
                                  short_desc: "Terms and Conditions",
                                },
                                value: "https://icicibank.com/loan/tnc.html",
                              },
                            ],
                            display: true,
                          },
                        ],
                        xinput: {
                          head: {
                            descriptor: { name: "Customer Information" },
                            index: { min: 0, cur: 2, max: 2 },
                            headings: [
                              "Financial Information",
                              "Individual KYC",
                              "Entity KYC",
                            ],
                          },
                          form: {
                            mime_type: "text/html",
                            url: "https://6vs8xnx5i7.icicibank.co.in/individual-kyc/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                            resubmit: false,
                            multiple_sumbissions: false,
                          },
                          required: true,
                        },
                      },
                    ],
                    quote: {
                      id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                      price: { currency: "INR", value: "171800" },
                      breakup: [
                        {
                          title: "Principal",
                          price: { value: "150000", currency: "INR" },
                        },
                        {
                          title: "Interest",
                          price: { value: "20000", currency: "INR" },
                        },
                        {
                          title: "Processing fee",
                          price: { value: "1800", currency: "INR" },
                        },
                      ],
                    },
                  },
                },
              },
            },
            {
              summary: "on_select-request-financial-info-form",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  action: "on_select",
                  version: "1.1.0",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62195",
                  message_id: "c8e3968c-cd78-4e46-aa34-0d541e46bd73",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  ttl: "P30M",
                },
                message: {
                  order: {
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "invoice-based-loan",
                          name: "Invoice Based Loan Offer: INR 2,00,000",
                        },
                        tags: [
                          {
                            descriptor: {
                              code: "general-info",
                              name: "General Information",
                            },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Loans starting from 12% (p.a)",
                                },
                              },
                            ],
                            display: true,
                          },
                        ],
                        xinput: {
                          head: {
                            descriptor: { name: "Customer Information" },
                            index: { min: 0, cur: 0, max: 2 },
                            headings: [
                              "Financial Information",
                              "Individual KYC",
                              "Entity KYC",
                            ],
                          },
                          form: {
                            mime_type: "text/html",
                            url: "https://6vs8xnx5i7.icicibank.co.in/loans-details/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                            resubmit: false,
                            multiple_sumbissions: false,
                          },
                          required: true,
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "on_select-request-with-kyc-form",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  action: "on_select",
                  version: "1.1.0",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62195",
                  message_id: "c8e3968c-cd78-4e46-aa34-0d541e46bd73",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  ttl: "P30M",
                },
                message: {
                  order: {
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "invoice-based-loan",
                          name: "Invoice Based Loan Offer: INR 2,00,000",
                        },
                        tags: [
                          {
                            descriptor: { name: "Invoice based loan terms" },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Rate of Interest (p.a)",
                                },
                                value: "12%",
                              },
                              {
                                descriptor: {
                                  name: "Interest Type",
                                  short_desc: "Type of Interest Rate",
                                },
                                value: "FLOATING",
                              },
                              {
                                descriptor: {
                                  name: "Term",
                                  short_desc: "Max Loan Term",
                                },
                                value: "5 months",
                              },
                              {
                                descriptor: {
                                  name: "Foreclosure Penalty",
                                  short_desc: "Loan Foreclosure Penalty",
                                },
                                value: "0.5%",
                              },
                              {
                                descriptor: {
                                  name: "Delayed payments penalty",
                                  short_desc: "Delayed payments penalty",
                                },
                                value: "5%",
                              },
                              {
                                descriptor: {
                                  name: "Terms & Conditions",
                                  short_desc: "Terms and Conditions",
                                },
                                value: "https://icicibank.com/loan/tnc.html",
                              },
                            ],
                            display: true,
                          },
                        ],
                        xinput: {
                          head: {
                            descriptor: { name: "Customer Information" },
                            index: { min: 0, cur: 1, max: 2 },
                            headings: [
                              "Financial Information",
                              "Individual KYC",
                              "Entity KYC",
                            ],
                          },
                          form: {
                            mime_type: "text/html",
                            url: "https://6vs8xnx5i7.icicibank.co.in/individual-kyc/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                            resubmit: false,
                            multiple_sumbissions: false,
                          },
                          required: true,
                        },
                      },
                    ],
                    quote: {
                      id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                      price: { currency: "INR", value: "171800" },
                      breakup: [
                        {
                          title: "Principal",
                          price: { value: "150000", currency: "INR" },
                        },
                        {
                          title: "Interest",
                          price: { value: "20000", currency: "INR" },
                        },
                        {
                          title: "Processing fee",
                          price: { value: "1800", currency: "INR" },
                        },
                      ],
                    },
                  },
                },
              },
            },
          ],
        },
        init: {
          examples: [
            {
              summary: "init",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  version: "1.1.0",
                  action: "init",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "0d30bfbf-87b8-43d2-8f95-36ebb9a24fd6",
                  ttl: "PT10M",
                  timestamp: "2023-05-25T05:23:03.443Z",
                },
                message: {
                  order: {
                    provider: { id: "1" },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        xinput: {
                          form_response: {
                            status: true,
                            submission_id:
                              "73ef9742-c17d-4c4e-92e3-b057960863af",
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "init-request-account-info-complete",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  version: "1.1.0",
                  action: "init",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "0d30bfbf-87b8-43d2-8f95-36ebb9a24fd6",
                  ttl: "PT10M",
                  timestamp: "2023-05-25T05:23:03.443Z",
                },
                message: {
                  order: {
                    provider: { id: "1" },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        xinput: {
                          form_response: {
                            status: true,
                            submission_id:
                              "73ef9742-c17d-4c4e-92e3-b057960863af",
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        on_init: {
          examples: [
            {
              summary: "on_init-request-loan-agreement-form",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  version: "1.1.0",
                  action: "on_init",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "166a5633-66d2-4ec8-bdcb-65cfeb1e4697",
                  ttl: "PT10M",
                  timestamp: "2023-05-25T05:23:03.443Z",
                },
                message: {
                  order: {
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "invoice-based-loan",
                          short_desc: "Invoice based loan of INR 2 Lakhs",
                        },
                        price: { currency: "INR", value: "231800" },
                        tags: [
                          {
                            descriptor: { name: "Invoice based loan terms" },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Rate of Interest (p.a)",
                                },
                                value: "12%",
                              },
                              {
                                descriptor: {
                                  name: "Interest Type",
                                  short_desc: "Type of Interest Rate",
                                },
                                value: "FLOATING",
                              },
                              {
                                descriptor: {
                                  name: "Term",
                                  short_desc: "Max Loan Term",
                                },
                                value: "5 months",
                              },
                              {
                                descriptor: {
                                  name: "Foreclosure Penalty",
                                  short_desc: "Loan Foreclosure Penalty",
                                },
                                value: "0.5%",
                              },
                              {
                                descriptor: {
                                  name: "Delayed payments penalty",
                                  short_desc: "Delayed payments penalty",
                                },
                                value: "5%",
                              },
                              {
                                descriptor: {
                                  name: "Terms & Conditions",
                                  short_desc: "Terms and Conditions",
                                },
                                value: "https://icicibank.com/loan/tnc.html",
                              },
                            ],
                            display: true,
                          },
                        ],
                        xinput: {
                          head: {
                            descriptor: { name: "Account Information" },
                            index: { min: 0, cur: 1, max: 1 },
                            headings: ["Account Information", "Loan Agreement"],
                          },
                          form: {
                            mime_type: "text/html",
                            url: "https://6vs8xnx5i7.icicibank.co.in/loan-agreement/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                            resubmit: false,
                            multiple_sumbissions: false,
                          },
                          required: true,
                        },
                      },
                    ],
                    quote: {
                      id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                      price: { currency: "INR", value: "231800" },
                      breakup: [
                        {
                          title: "Principal",
                          price: { value: "200000", currency: "INR" },
                        },
                        {
                          title: "Interest",
                          price: { value: "30000", currency: "INR" },
                        },
                        {
                          title: "Processing fee",
                          price: { value: "1800", currency: "INR" },
                        },
                      ],
                    },
                    fulfillments: [
                      {
                        customer: {
                          organization: {
                            address: "Industrial Park, Bangalore",
                            state: { name: "Karnataka" },
                            city: { name: "Bangalore", code: "560045" },
                            contact: {
                              phone: "+919876543210",
                              email: "alpha.manufacturing@gmail.com",
                            },
                          },
                        },
                        state: { descriptor: { name: "Loan Initiated" } },
                      },
                    ],
                    payments: [
                      {
                        type: "ON-ORDER",
                        url: "https://emandate.icicibank.in",
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-06-01T00:00:00.000Z",
                            end: "2023-06-30T00:23:59.999Z",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-07-01T00:00:00.000Z",
                            end: "2023-07-31T00:23:59.999",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-08-01T00:00:00.000Z",
                            end: "2023-08-31T00:23:59.999",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-09-01T00:00:00.000Z",
                            end: "2023-09-30T00:23:59.999Z",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-10-01T00:00:00.000Z",
                            end: "2023-10-31T00:23:59.999",
                          },
                        },
                      },
                    ],
                    cancellation_terms: [
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan sanctioned" },
                        },
                        cancellation_fee: { percentage: "3%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan disbursed" },
                        },
                        cancellation_fee: { percentage: "5%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "on_init-request-loan-agreement-form",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  version: "1.1.0",
                  action: "on_init",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "166a5633-66d2-4ec8-bdcb-65cfeb1e4697",
                  ttl: "PT10M",
                  timestamp: "2023-05-25T05:23:03.443Z",
                },
                message: {
                  order: {
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "invoice-based-loan",
                          short_desc: "Invoice based loan of INR 2 Lakhs",
                        },
                        price: { currency: "INR", value: "231800" },
                        tags: [
                          {
                            descriptor: { name: "Invoice based loan terms" },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Rate of Interest (p.a)",
                                },
                                value: "12%",
                              },
                              {
                                descriptor: {
                                  name: "Interest Type",
                                  short_desc: "Type of Interest Rate",
                                },
                                value: "FLOATING",
                              },
                              {
                                descriptor: {
                                  name: "Term",
                                  short_desc: "Max Loan Term",
                                },
                                value: "5 months",
                              },
                              {
                                descriptor: {
                                  name: "Foreclosure Penalty",
                                  short_desc: "Loan Foreclosure Penalty",
                                },
                                value: "0.5%",
                              },
                              {
                                descriptor: {
                                  name: "Delayed payments penalty",
                                  short_desc: "Delayed payments penalty",
                                },
                                value: "5%",
                              },
                              {
                                descriptor: {
                                  name: "Terms & Conditions",
                                  short_desc: "Terms and Conditions",
                                },
                                value: "https://icicibank.com/loan/tnc.html",
                              },
                            ],
                            display: true,
                          },
                        ],
                        xinput: {
                          head: {
                            descriptor: { name: "Account Information" },
                            index: { min: 0, cur: 1, max: 1 },
                            headings: ["Account Information", "Loan Agreement"],
                          },
                          form: {
                            mime_type: "text/html",
                            url: "https://6vs8xnx5i7.icicibank.co.in/loan-agreement/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                            resubmit: false,
                            multiple_sumbissions: false,
                          },
                          required: true,
                        },
                      },
                    ],
                    quote: {
                      id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                      price: { currency: "INR", value: "231800" },
                      breakup: [
                        {
                          title: "Principal",
                          price: { value: "200000", currency: "INR" },
                        },
                        {
                          title: "Interest",
                          price: { value: "30000", currency: "INR" },
                        },
                        {
                          title: "Processing fee",
                          price: { value: "1800", currency: "INR" },
                        },
                      ],
                    },
                    fulfillments: [
                      {
                        customer: {
                          organization: {
                            address: "Industrial Park, Bangalore",
                            state: { name: "Karnataka" },
                            city: { name: "Bangalore", code: "560045" },
                            contact: {
                              phone: "+919876543210",
                              email: "alpha.manufacturing@gmail.com",
                            },
                          },
                        },
                        state: { descriptor: { name: "Loan Initiated" } },
                      },
                    ],
                    payments: [
                      {
                        type: "ON-ORDER",
                        url: "https://emandate.icicibank.in",
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-06-01T00:00:00.000Z",
                            end: "2023-06-30T00:23:59.999Z",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-07-01T00:00:00.000Z",
                            end: "2023-07-31T00:23:59.999",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-08-01T00:00:00.000Z",
                            end: "2023-08-31T00:23:59.999",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-09-01T00:00:00.000Z",
                            end: "2023-09-30T00:23:59.999Z",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-10-01T00:00:00.000Z",
                            end: "2023-10-31T00:23:59.999",
                          },
                        },
                      },
                    ],
                    cancellation_terms: [
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan sanctioned" },
                        },
                        cancellation_fee: { percentage: "3%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan disbursed" },
                        },
                        cancellation_fee: { percentage: "5%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        confirm: {
          examples: [
            {
              summary: "confirm",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                  action: "confirm",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  version: "1.1.0",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  ttl: "PT10M",
                },
                message: {
                  order: {
                    provider: { id: "1" },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        xinput: {
                          form_response: {
                            status: true,
                            submission_id:
                              "c844d5f4-29c3-4398-b594-8b4716ef5dbf",
                          },
                        },
                      },
                    ],
                    fulfillments: [
                      {
                        stops: [
                          { authorization: { type: "OTP", token: "535346" } },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        on_confirm: {
          examples: [
            {
              summary: "on_confirm",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  version: "1.1.0",
                  action: "on_confirm",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "0d30bfbf-87b8-43d2-8f95-36ebb9a24fd6",
                  ttl: "PT10M",
                  timestamp: "2023-05-25T05:23:03.443Z",
                },
                message: {
                  order: {
                    id: "66B7AEDF45",
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "invoice-based-loan",
                          name: "Invoice based Loan Offer: INR 2,00,000",
                        },
                        price: { currency: "INR", value: "231800" },
                        tags: [
                          {
                            descriptor: { name: "Invoice based loan terms" },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Rate of Interest (p.a)",
                                },
                                value: "12%",
                              },
                              {
                                descriptor: {
                                  name: "Interest Type",
                                  short_desc: "Type of Interest Rate",
                                },
                                value: "FLOATING",
                              },
                              {
                                descriptor: {
                                  name: "Term",
                                  short_desc: "Max Loan Term",
                                },
                                value: "5 months",
                              },
                              {
                                descriptor: {
                                  name: "Foreclosure Penalty",
                                  short_desc: "Loan Foreclosure Penalty",
                                },
                                value: "0.5%",
                              },
                              {
                                descriptor: {
                                  name: "Delayed payments penalty",
                                  short_desc: "Delayed payments penalty",
                                },
                                value: "5%",
                              },
                              {
                                descriptor: {
                                  name: "Terms & Conditions",
                                  short_desc: "Terms and Conditions",
                                },
                                value: "https://icicibank.com/loan/tnc.html",
                              },
                            ],
                            display: true,
                          },
                        ],
                      },
                    ],
                    quote: {
                      id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                      price: { currency: "INR", value: "231800" },
                      breakup: [
                        {
                          title: "Principal",
                          price: { value: "200000", currency: "INR" },
                        },
                        {
                          title: "Interest",
                          price: { value: "30000", currency: "INR" },
                        },
                        {
                          title: "Processing fee",
                          price: { value: "1800", currency: "INR" },
                        },
                      ],
                    },
                    fulfillments: [
                      {
                        customer: {
                          organization: {
                            address: "Industrial Park, Bangalore",
                            state: { name: "Karnataka" },
                            city: { name: "Bangalore", code: "560045" },
                            contact: {
                              phone: "+919876543210",
                              email: "alpha.manufacturing@gmail.com",
                            },
                          },
                        },
                        state: { descriptor: { name: "Loan Sanctioned" } },
                      },
                    ],
                    payments: [
                      {
                        type: "ON-ORDER",
                        url: "https://emandate.icicibank.in",
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-06-01T00:00:00.000Z",
                            end: "2023-06-30T00:23:59.999Z",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-07-01T00:00:00.000Z",
                            end: "2023-07-31T00:23:59.999",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-08-01T00:00:00.000Z",
                            end: "2023-08-31T00:23:59.999",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-09-01T00:00:00.000Z",
                            end: "2023-09-30T00:23:59.999Z",
                          },
                        },
                      },
                      {
                        params: { amount: "46360", currency: "INR" },
                        status: "NOT-PAID",
                        time: {
                          range: {
                            start: "2023-10-01T00:00:00.000Z",
                            end: "2023-10-31T00:23:59.999",
                          },
                        },
                      },
                    ],
                    cancellation_terms: [
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan sanctioned" },
                        },
                        cancellation_fee: { percentage: "3%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan disbursed" },
                        },
                        cancellation_fee: { percentage: "5%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        update: {
          examples: [
            {
              summary: "update",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                  action: "update",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  version: "1.1.0",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  ttl: "PT10M",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                },
                message: {
                  update_target: "fulfillment",
                  order: {
                    id: "66B7AEDF45",
                    fulfillments: [
                      {
                        customer: {
                          organization: {
                            address: "Industrial Park, Udupi",
                            state: { name: "Karnataka" },
                            city: { name: "Udupi", code: "576101" },
                            contact: {
                              phone: "+919876543210",
                              email: "alpha.manufacturinofficialg@gmail.com",
                            },
                          },
                        },
                        state: {
                          descriptor: { name: "Loan application updated" },
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        on_update: {
          examples: [
            {
              summary: "on_update",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  version: "1.1.0",
                  action: "on_update",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "0d30bfbf-87b8-43d2-8f95-36ebb9a24fd6",
                  ttl: "PT10M",
                  timestamp: "2023-05-25T05:23:03.443Z",
                },
                message: {
                  order: {
                    id: "66B7AEDF45",
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "invoice-based-loan",
                          name: "Invoice based Loan Offer: INR 2,00,000",
                        },
                        price: { currency: "INR", value: "231800" },
                        tags: [
                          {
                            descriptor: { name: "Invoice based loan terms" },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Rate of Interest (p.a)",
                                },
                                value: "12%",
                              },
                              {
                                descriptor: {
                                  name: "Interest Type",
                                  short_desc: "Type of Interest Rate",
                                },
                                value: "FLOATING",
                              },
                              {
                                descriptor: {
                                  name: "Term",
                                  short_desc: "Max Loan Term",
                                },
                                value: "5 months",
                              },
                              {
                                descriptor: {
                                  name: "Foreclosure Penalty",
                                  short_desc: "Loan Foreclosure Penalty",
                                },
                                value: "0.5%",
                              },
                              {
                                descriptor: {
                                  name: "Delayed payments penalty",
                                  short_desc: "Delayed payments penalty",
                                },
                                value: "5%",
                              },
                              {
                                descriptor: {
                                  name: "Terms & Conditions",
                                  short_desc: "Terms and Conditions",
                                },
                                value: "https://icicibank.com/loan/tnc.html",
                              },
                            ],
                            display: true,
                          },
                        ],
                      },
                    ],
                    quote: {
                      id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                      price: { currency: "INR", value: "231800" },
                      breakup: [
                        {
                          title: "Installment 1",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 2",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 3",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 4",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 5",
                          price: { value: "46360", currency: "INR" },
                        },
                      ],
                    },
                    fulfillments: [
                      {
                        customer: {
                          organization: {
                            address: "Industrial Park, Udupi",
                            state: { name: "Karnataka" },
                            city: { name: "Udupi", code: "576101" },
                            contact: {
                              phone: "+919876543210",
                              email: "alpha.manufacturinofficialg@gmail.com",
                            },
                          },
                        },
                        state: {
                          descriptor: { name: "Loan application updated" },
                        },
                      },
                    ],
                    payments: [
                      {
                        url: "https://emandate.icicibank.in",
                        params: { amount: "185440", currency: "INR" },
                        status: "NOT-PAID",
                      },
                    ],
                    cancellation_terms: [
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan sanctioned" },
                        },
                        cancellation_fee: { percentage: "3%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan disbursed" },
                        },
                        cancellation_fee: { percentage: "5%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        status: {
          examples: [
            {
              summary: "status",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                  action: "status",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  version: "1.1.0",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  ttl: "PT10M",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                },
                message: { order_id: "66b7b9bad166-4a3f-ada6-ca063dc9d321" },
              },
            },
          ],
        },
        on_status: {
          examples: [
            {
              summary: "on_status",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  version: "1.1.0",
                  action: "on_status",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "166a5633-66d2-4ec8-bdcb-65cfeb1e4697",
                  ttl: "PT10M",
                  timestamp: "2023-05-25T05:23:03.443Z",
                },
                message: {
                  order: {
                    id: "66B7AEDF45",
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "invoice-based-loan",
                          name: "Invoice Based Loan Offer: INR 2,00,000",
                        },
                        price: { currency: "INR", value: "231800" },
                        tags: [
                          {
                            descriptor: { name: "Invoice Based Loan terms" },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Rate of Interest (p.a)",
                                },
                                value: "12%",
                              },
                              {
                                descriptor: {
                                  name: "Interest Type",
                                  short_desc: "Type of Interest Rate",
                                },
                                value: "FLOATING",
                              },
                              {
                                descriptor: {
                                  name: "Term",
                                  short_desc: "Max Loan Term",
                                },
                                value: "5 months",
                              },
                              {
                                descriptor: {
                                  name: "Foreclosure Penalty",
                                  short_desc: "Loan Foreclosure Penalty",
                                },
                                value: "0.5%",
                              },
                              {
                                descriptor: {
                                  name: "Delayed payments penalty",
                                  short_desc: "Delayed payments penalty",
                                },
                                value: "5%",
                              },
                              {
                                descriptor: {
                                  name: "Terms & Conditions",
                                  short_desc: "Terms and Conditions",
                                },
                                value: "https://icicibank.com/loan/tnc.html",
                              },
                            ],
                            display: true,
                          },
                        ],
                      },
                    ],
                    quote: {
                      id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                      price: { currency: "INR", value: "231800" },
                      breakup: [
                        {
                          title: "Installment 1",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 2",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 3",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 4",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 5",
                          price: { value: "46360", currency: "INR" },
                        },
                      ],
                    },
                    fulfillments: [
                      {
                        customer: {
                          person: { name: "John Doe" },
                          contact: {
                            phone: "+91-9999999999",
                            email: "john.doe@example.com",
                          },
                        },
                        state: { descriptor: { name: "Loan Disbursed" } },
                      },
                    ],
                    payments: [
                      {
                        url: "https://emandate.icicibank.in",
                        params: { amount: "185440", currency: "INR" },
                        status: "NOT-PAID",
                      },
                    ],
                    cancellation_terms: [
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan sanctioned" },
                        },
                        cancellation_fee: { percentage: "3%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan disbursed" },
                        },
                        cancellation_fee: { percentage: "5%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "on_status-request-after-installment",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  version: "1.1.0",
                  action: "on_status",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "166a5633-66d2-4ec8-bdcb-65cfeb1e4697",
                  ttl: "PT10M",
                  timestamp: "2023-05-25T05:23:03.443Z",
                },
                message: {
                  order: {
                    id: "66B7AEDF45",
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "invoice-based-loan",
                          name: "Invoice Based Loan Offer: INR 2,00,000",
                        },
                        price: { currency: "INR", value: "231800" },
                        tags: [
                          {
                            descriptor: { name: "Invoice Based Loan terms" },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Rate of Interest (p.a)",
                                },
                                value: "12%",
                              },
                              {
                                descriptor: {
                                  name: "Interest Type",
                                  short_desc: "Type of Interest Rate",
                                },
                                value: "FLOATING",
                              },
                              {
                                descriptor: {
                                  name: "Term",
                                  short_desc: "Max Loan Term",
                                },
                                value: "5 months",
                              },
                              {
                                descriptor: {
                                  name: "Foreclosure Penalty",
                                  short_desc: "Loan Foreclosure Penalty",
                                },
                                value: "0.5%",
                              },
                              {
                                descriptor: {
                                  name: "Delayed payments penalty",
                                  short_desc: "Delayed payments penalty",
                                },
                                value: "5%",
                              },
                              {
                                descriptor: {
                                  name: "Terms & Conditions",
                                  short_desc: "Terms and Conditions",
                                },
                                value: "https://icicibank.com/loan/tnc.html",
                              },
                            ],
                            display: true,
                          },
                        ],
                      },
                    ],
                    quote: {
                      id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                      price: { currency: "INR", value: "231800" },
                      breakup: [
                        {
                          title: "Installment 1",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 2",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 3",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 4",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 5",
                          price: { value: "46360", currency: "INR" },
                        },
                      ],
                    },
                    fulfillments: [
                      {
                        customer: {
                          person: { name: "John Doe" },
                          contact: {
                            phone: "+91-9999999999",
                            email: "john.doe@example.com",
                          },
                        },
                        state: {
                          descriptor: { name: "Installment 1/5 received" },
                        },
                      },
                    ],
                    payments: [
                      {
                        url: "https://emandate.icicibank.in",
                        params: { amount: "231800", currency: "INR" },
                        status: "NOT-PAID",
                      },
                    ],
                    cancellation_terms: [
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan sanctioned" },
                        },
                        cancellation_fee: { percentage: "3%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan disbursed" },
                        },
                        cancellation_fee: { percentage: "5%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "on_status-request-full-repayment",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  version: "1.1.0",
                  action: "on_status",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "166a5633-66d2-4ec8-bdcb-65cfeb1e4697",
                  ttl: "PT10M",
                  timestamp: "2023-05-25T05:23:03.443Z",
                },
                message: {
                  order: {
                    id: "66B7AEDF45",
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "invoice-based-loan",
                          name: "Invoice Based Loan Offer: INR 2,00,000",
                        },
                        price: { currency: "INR", value: "231800" },
                        tags: [
                          {
                            descriptor: { name: "Invoice Based Loan terms" },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Rate of Interest (p.a)",
                                },
                                value: "12%",
                              },
                              {
                                descriptor: {
                                  name: "Interest Type",
                                  short_desc: "Type of Interest Rate",
                                },
                                value: "FLOATING",
                              },
                              {
                                descriptor: {
                                  name: "Term",
                                  short_desc: "Max Loan Term",
                                },
                                value: "5 months",
                              },
                              {
                                descriptor: {
                                  name: "Foreclosure Penalty",
                                  short_desc: "Loan Foreclosure Penalty",
                                },
                                value: "0.5%",
                              },
                              {
                                descriptor: {
                                  name: "Delayed payments penalty",
                                  short_desc: "Delayed payments penalty",
                                },
                                value: "5%",
                              },
                              {
                                descriptor: {
                                  name: "Terms & Conditions",
                                  short_desc: "Terms and Conditions",
                                },
                                value: "https://icicibank.com/loan/tnc.html",
                              },
                            ],
                            display: true,
                          },
                        ],
                      },
                    ],
                    quote: {
                      id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                      price: { currency: "INR", value: "231800" },
                      breakup: [
                        {
                          title: "Installment 1",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 2",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 3",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 4",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 5",
                          price: { value: "46360", currency: "INR" },
                        },
                      ],
                    },
                    fulfillments: [
                      {
                        customer: {
                          person: { name: "John Doe" },
                          contact: {
                            phone: "+91-9999999999",
                            email: "john.doe@example.com",
                          },
                        },
                        state: {
                          descriptor: { name: "Installment 5/5 received" },
                        },
                      },
                    ],
                    payments: [
                      {
                        url: "https://emandate.icicibank.in",
                        params: { amount: "0", currency: "INR" },
                        status: "PAID",
                      },
                    ],
                    cancellation_terms: [
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan sanctioned" },
                        },
                        cancellation_fee: { percentage: "3%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan disbursed" },
                        },
                        cancellation_fee: { percentage: "5%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "on_status-request-late-repayment-installment",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  version: "1.1.0",
                  action: "on_status",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "166a5633-66d2-4ec8-bdcb-65cfeb1e4697",
                  ttl: "PT10M",
                  timestamp: "2023-05-25T05:23:03.443Z",
                },
                message: {
                  order: {
                    id: "66B7AEDF45",
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "invoice-based-loan",
                          name: "Invoice Based Loan Offer: INR 2,00,000",
                        },
                        price: { currency: "INR", value: "231800" },
                        tags: [
                          {
                            descriptor: { name: "Invoice Based Loan terms" },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Rate of Interest (p.a)",
                                },
                                value: "12%",
                              },
                              {
                                descriptor: {
                                  name: "Interest Type",
                                  short_desc: "Type of Interest Rate",
                                },
                                value: "FLOATING",
                              },
                              {
                                descriptor: {
                                  name: "Term",
                                  short_desc: "Max Loan Term",
                                },
                                value: "5 months",
                              },
                              {
                                descriptor: {
                                  name: "Foreclosure Penalty",
                                  short_desc: "Loan Foreclosure Penalty",
                                },
                                value: "0.5%",
                              },
                              {
                                descriptor: {
                                  name: "Delayed payments penalty",
                                  short_desc: "Delayed payments penalty",
                                },
                                value: "5%",
                              },
                              {
                                descriptor: {
                                  name: "Terms & Conditions",
                                  short_desc: "Terms and Conditions",
                                },
                                value: "https://icicibank.com/loan/tnc.html",
                              },
                            ],
                            display: true,
                          },
                        ],
                      },
                    ],
                    quote: {
                      id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                      price: { currency: "INR", value: "231800" },
                      breakup: [
                        {
                          title: "Late fee for the month of August",
                          price: { value: "4636", currency: "INR" },
                        },
                        {
                          title: "Installment 1",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 2",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 3",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 4",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 5",
                          price: { value: "46360", currency: "INR" },
                        },
                      ],
                    },
                    fulfillments: [
                      {
                        customer: {
                          person: { name: "John Doe" },
                          contact: {
                            phone: "+91-9999999999",
                            email: "john.doe@example.com",
                          },
                        },
                        state: {
                          descriptor: { name: "Installment 1/5 received" },
                        },
                      },
                    ],
                    payments: [
                      {
                        url: "https://emandate.icicibank.in",
                        params: { amount: "236160", currency: "INR" },
                        status: "NOT-PAID",
                      },
                    ],
                    cancellation_terms: [
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan sanctioned" },
                        },
                        cancellation_fee: { percentage: "3%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan disbursed" },
                        },
                        cancellation_fee: { percentage: "5%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        cancel: {
          examples: [
            {
              summary: "cancel",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                  action: "cancel",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  version: "1.1.0",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  ttl: "PT10M",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                },
                message: {
                  order_id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                  cancellation_reason_id: "5",
                  descriptor: { short_desc: "Invoice was cancelled" },
                },
              },
            },
          ],
        },
        on_cancel: {
          examples: [
            {
              summary: "on_cancel",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                  action: "on_cancel",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  version: "1.1.0",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  ttl: "PT10M",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                },
                message: {
                  order: {
                    id: "66B7AEDF45",
                    provider: {
                      id: "1",
                      descriptor: {
                        images: [
                          {
                            url: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                            size_type: "sm",
                          },
                        ],
                        name: "ICICI Bank",
                        short_desc: "ICICI Bank Ltd",
                        long_desc: "ICICI Bank Ltd, India.",
                      },
                    },
                    items: [
                      {
                        id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                        descriptor: {
                          code: "invoice-based-loan",
                          name: "Invoice based Loan Offer: INR 2,00,000",
                        },
                        price: { currency: "INR", value: "231800" },
                        tags: [
                          {
                            descriptor: { name: "Invoice based loan terms" },
                            list: [
                              {
                                descriptor: {
                                  name: "Interest Rate",
                                  short_desc: "Rate of Interest (p.a)",
                                },
                                value: "12%",
                              },
                              {
                                descriptor: {
                                  name: "Interest Type",
                                  short_desc: "Type of Interest Rate",
                                },
                                value: "FLOATING",
                              },
                              {
                                descriptor: {
                                  name: "Term",
                                  short_desc: "Max Loan Term",
                                },
                                value: "5 months",
                              },
                              {
                                descriptor: {
                                  name: "Foreclosure Penalty",
                                  short_desc: "Loan Foreclosure Penalty",
                                },
                                value: "0.5%",
                              },
                              {
                                descriptor: {
                                  name: "Delayed payments penalty",
                                  short_desc: "Delayed payments penalty",
                                },
                                value: "5%",
                              },
                              {
                                descriptor: {
                                  name: "Terms & Conditions",
                                  short_desc: "Terms and Conditions",
                                },
                                value: "https://icicibank.com/loan/tnc.html",
                              },
                            ],
                            display: true,
                          },
                        ],
                      },
                    ],
                    quote: {
                      id: "b469bb12-9f67-4898-8f39-ea7816f54289",
                      price: { currency: "INR", value: "231800" },
                      breakup: [
                        {
                          title: "Installment 1",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 2",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 3",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 4",
                          price: { value: "46360", currency: "INR" },
                        },
                        {
                          title: "Installment 5",
                          price: { value: "46360", currency: "INR" },
                        },
                      ],
                    },
                    fulfillments: [
                      {
                        customer: {
                          organization: {
                            address: "Industrial Park, Bangalore",
                            state: { name: "Karnataka" },
                            city: { name: "Bangalore", code: "560045" },
                            contact: {
                              phone: "+919876543210",
                              email: "alpha.manufacturing@gmail.com",
                            },
                          },
                        },
                        state: { descriptor: { name: "Loan Cancelled" } },
                      },
                    ],
                    payments: [
                      {
                        url: "https://emandate.icicibank.in",
                        params: { amount: "185440", currency: "INR" },
                        status: "NOT-PAID",
                      },
                    ],
                    cancellation_terms: [
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan sanctioned" },
                        },
                        cancellation_fee: { percentage: "3%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                      {
                        fulfillment_state: {
                          descriptor: { name: "Loan disbursed" },
                        },
                        cancellation_fee: { percentage: "5%" },
                        external_ref: {
                          mimetype: "text/html",
                          url: "https://icicibank.com/loan/tnc.html",
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        support: {
          examples: [
            {
              summary: "support",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                  action: "support",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  version: "1.1.0",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  ttl: "PT10M",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                },
                message: {
                  support: {
                    order_id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                    phone: "+919876543210",
                    email: "alpha.manufacturing@gmail.com",
                  },
                },
              },
            },
          ],
        },
        on_support: {
          examples: [
            {
              summary: "on_support",
              description: "TBD",
              value: {
                context: {
                  domain: "financial-services:0.2.0",
                  location: { country: { code: "IND" } },
                  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196",
                  message_id: "bb579fb8-cb82-4824-be12-fcbc405b6608",
                  action: "on_support",
                  timestamp: "2023-05-25T05:23:03.443Z",
                  version: "1.1.0",
                  bap_uri: "https://credit-protocol-network.becknprotocol.io/",
                  bap_id: "credit-protocol.becknprotocol.io",
                  ttl: "PT10M",
                  bpp_id: "bpp.credit.icicibank.io",
                  bpp_uri: "https://bpp.credit.icicibank.io",
                },
                message: {
                  support: {
                    order_id: "66b7b9bad166-4a3f-ada6-ca063dc9d321",
                    phone: "1800 1080",
                    email: "customer.care@icicibank.com",
                    url: "https://www.icicibank.com/helpdesk",
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
  "x-attributes": {
    "public-loans": {
      attribute_set: {
        search: {
          message: {
            intent: {
              descriptor: {
                code: {
                  required: true,
                  description:
                    "Physical description of code value for something",
                  reference: "if any",
                  usage: "personal-loan",
                },
              },
            },
            price: {
              value: {
                required: false,
                description: "Describes a numerical value in decimal form",
                reference: "if any",
                usage: "30",
              },
              currency: {
                required: false,
                description: "Describes currency value in string form",
                reference: "if any",
                usage: "IND",
              },
            },
          },
        },
        on_search: {
          message: {
            catalog: {
              descriptor: {
                name: {
                  required: true,
                  description:
                    "Physical description of name value for something.",
                  reference: "if any",
                  usage: "Personal loan",
                },
              },
              providers: {
                id: {
                  required: true,
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
                },
                descriptor: {
                  name: {
                    required: true,
                    description:
                      "Physical description of name value for something.",
                    reference: "if any",
                    usage: "Personal loan",
                  },
                  short_desc: {
                    required: false,
                    description: "Short description of value for something.",
                    reference: "if any",
                    usage: "ICICI Bank Ltd",
                  },
                  long_desc: {
                    required: false,
                    description: "Long description of value for something.",
                    reference: "if any",
                    usage: "ICICI Bank Ltd, India",
                  },
                  images: {
                    url: {
                      required: true,
                      description: "Physical description of the item",
                      reference: "if any",
                      usage: "Found drivers",
                    },
                  },
                },
              },
              categories: {
                id: {
                  required: true,
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
                },
                descriptor: {
                  code: {
                    required: true,
                    description:
                      "Physical description of code value for something",
                    reference: "if any",
                    usage: "personal-loan",
                  },
                  name: {
                    required: true,
                    description:
                      "Physical description of name value for something.",
                    reference: "if any",
                    usage: "Personal loan",
                  },
                },
              },
              items: {
                id: {
                  required: true,
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
                },
                descriptor: {
                  name: {
                    required: true,
                    description:
                      "Physical description of name value for something.",
                    reference: "if any",
                    usage: "Personal loan",
                  },
                  short_desc: {
                    required: false,
                    description: "Short description of value for something.",
                    reference: "if any",
                    usage: "ICICI Bank Ltd",
                  },
                  long_desc: {
                    required: false,
                    description: "Long description of value for something.",
                    reference: "if any",
                    usage: "ICICI Bank Ltd, India",
                  },
                  images: {
                    url: {
                      required: true,
                      description: "Physical description of the item",
                      reference: "if any",
                      usage: "Found drivers",
                    },
                  },
                },
                category_ids: {
                  required: true,
                  description: "Categories this item can be listed under",
                  reference: "if any",
                  usage: "de409a6e-0a38-473d-a246-fb9ee5f9a48e",
                },
                xinput: {
                  head: {
                    descriptor: {
                      name: {
                        required: true,
                        description:
                          "Physical description of name value for something.",
                        reference: "if any",
                        usage: "Personal loan",
                      },
                    },
                    index: {
                      min: {
                        required: false,
                        description: "Minimum index value of form",
                        reference: "if any",
                        usage: 0,
                      },
                      max: {
                        required: true,
                        description: "Maximum index value of form",
                        reference: "if any",
                        usage: 2,
                      },
                      cur: {
                        required: true,
                        description: "Current index value of form",
                        reference: "if any",
                        usage: 1,
                      },
                    },
                    form: {
                      id: {
                        required: true,
                        description: "Unique human readable ID.",
                        reference: "if any",
                        usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
                      },
                      url: {
                        required: true,
                        description: "Unique human readable ID.",
                        reference: "if any",
                        usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
                      },
                      mime_type: {
                        required: true,
                        description: "Describes the mime of the document.",
                        reference: "if any",
                        usage: "text/html",
                      },
                      resubmit: {
                        required: true,
                        description:
                          "Describes a form can be re-submited again or not.",
                        reference: "if any",
                        usage: false,
                      },
                      multiple_sumbissions: {
                        required: true,
                        description:
                          "Describes a form supports multiple sumbissions or not.",
                        reference: "if any",
                        usage: false,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        select: {
          message: {
            order: {
              provider: {
                id: {
                  required: true,
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
                },
                items: {
                  id: {
                    required: true,
                    description: "Unique human readable ID.",
                    reference: "if any",
                    usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
                  },
                  xinput: {
                    form_response: {
                      status: {
                        required: true,
                        description: "Describes the status of form",
                        reference: "if any",
                        usage: true,
                      },
                      submission_id: {
                        required: true,
                        description: "Describes the uique submission id",
                        reference: "if any",
                        usage: "c844d5f4-29c3-4398-b594-8b4716ef5dbf",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        on_select: {
          message: {
            order: {
              provider: {
                id: {
                  required: true,
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
                },
                descriptor: {
                  name: {
                    required: true,
                    description:
                      "Physical description of name value for something.",
                    reference: "if any",
                    usage: "Personal loan",
                  },
                  short_desc: {
                    required: false,
                    description: "Short description of value for something.",
                    reference: "if any",
                    usage: "ICICI Bank Ltd",
                  },
                  long_desc: {
                    required: false,
                    description: "Long description of value for something.",
                    reference: "if any",
                    usage: "ICICI Bank Ltd, India",
                  },
                  images: {
                    url: {
                      required: true,
                      description: "Physical description of the item",
                      reference: "if any",
                      usage: "Found drivers",
                    },
                  },
                },
              },
              items: {
                id: {
                  required: true,
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
                },
                descriptor: {
                  name: {
                    required: true,
                    description:
                      "Physical description of name value for something.",
                    reference: "if any",
                    usage: "Personal loan",
                  },
                  short_desc: {
                    required: false,
                    description: "Short description of value for something.",
                    reference: "if any",
                    usage: "ICICI Bank Ltd",
                  },
                  long_desc: {
                    required: false,
                    description: "Long description of value for something.",
                    reference: "if any",
                    usage: "ICICI Bank Ltd, India",
                  },
                  images: {
                    url: {
                      required: true,
                      description: "Physical description of the item",
                      reference: "if any",
                      usage: "Found drivers",
                    },
                  },
                },
                xinput: {
                  head: {
                    descriptor: {
                      name: {
                        required: true,
                        description:
                          "Physical description of name value for something.",
                        reference: "if any",
                        usage: "Personal loan",
                      },
                    },
                  },
                  index: {
                    min: {
                      required: false,
                      description: "Minimum index value of form",
                      reference: "if any",
                      usage: 0,
                    },
                    max: {
                      required: true,
                      description: "Maximum index value of form",
                      reference: "if any",
                      usage: 2,
                    },
                    cur: {
                      required: true,
                      description: "Current index value of form",
                      reference: "if any",
                      usage: 1,
                    },
                  },
                  form: {
                    url: {
                      required: true,
                      description: "Unique human readable ID.",
                      reference: "if any",
                      usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
                    },
                    mime_type: {
                      required: true,
                      description: "Describes the mime of the document.",
                      reference: "if any",
                      usage: "text/html",
                    },
                    resubmit: {
                      required: true,
                      description:
                        "Describes a form can be re-submited again or not.",
                      reference: "if any",
                      usage: false,
                    },
                    multiple_sumbissions: {
                      required: true,
                      description:
                        "Describes a form supports multiple sumbissions or not.",
                      reference: "if any",
                      usage: false,
                    },
                  },
                },
              },
            },
          },
        },
        init: {
          message: {
            order: {
              provider: {
                id: {
                  required: true,
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
                },
                items: {
                  id: {
                    required: true,
                    description: "Unique human readable ID.",
                    reference: "if any",
                    usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
                  },
                  xinput: {
                    form_response: {
                      status: {
                        required: true,
                        description: "Describes the status of form",
                        reference: "if any",
                        usage: true,
                      },
                      submission_id: {
                        required: true,
                        description: "Describes the uique submission id",
                        reference: "if any",
                        usage: "c844d5f4-29c3-4398-b594-8b4716ef5dbf",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        on_init: {
          message: {
            order: {
              provider: {
                id: {
                  required: true,
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
                },
                descriptor: {
                  name: {
                    required: true,
                    description:
                      "Physical description of name value for something.",
                    reference: "if any",
                    usage: "Personal loan",
                  },
                  short_desc: {
                    required: false,
                    description: "Short description of value for something.",
                    reference: "if any",
                    usage: "ICICI Bank Ltd",
                  },
                  long_desc: {
                    required: false,
                    description: "Long description of value for something.",
                    reference: "if any",
                    usage: "ICICI Bank Ltd, India",
                  },
                  images: {
                    url: {
                      required: true,
                      description: "Physical description of the item",
                      reference: "if any",
                      usage: "Found drivers",
                    },
                  },
                },
                items: {
                  id: {
                    required: true,
                    description: "Unique human readable ID.",
                    reference: "if any",
                    usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
                  },
                  descriptor: {
                    name: {
                      required: true,
                      description:
                        "Physical description of name value for something.",
                      reference: "if any",
                      usage: "Personal loan",
                    },
                    short_desc: {
                      required: false,
                      description: "Short description of value for something.",
                      reference: "if any",
                      usage: "ICICI Bank Ltd",
                    },
                    long_desc: {
                      required: false,
                      description: "Long description of value for something.",
                      reference: "if any",
                      usage: "ICICI Bank Ltd, India",
                    },
                    images: {
                      url: {
                        required: true,
                        description: "Physical description of the item",
                        reference: "if any",
                        usage: "Found drivers",
                      },
                    },
                  },
                  price: {
                    value: {
                      required: false,
                      description:
                        "Describes a numerical value in decimal form",
                      reference: "if any",
                      usage: "30",
                    },
                    currency: {
                      required: false,
                      description: "Describes currency value in string form",
                      reference: "if any",
                      usage: "IND",
                    },
                  },
                  xinput: {
                    form_response: {
                      status: {
                        required: true,
                        description: "Describes the status of form",
                        reference: "if any",
                        usage: true,
                      },
                      submission_id: {
                        required: true,
                        description: "Describes the uique submission id",
                        reference: "if any",
                        usage: "c844d5f4-29c3-4398-b594-8b4716ef5dbf",
                      },
                    },
                  },
                },
                quote: {
                  id: {
                    required: true,
                    description: "Unique human readable ID.",
                    reference: "if any",
                    usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
                  },
                  price: {
                    value: {
                      required: false,
                      description:
                        "Describes a numerical value in decimal form",
                      reference: "if any",
                      usage: "30",
                    },
                    currency: {
                      required: false,
                      description: "Describes currency value in string form",
                      reference: "if any",
                      usage: "IND",
                    },
                  },
                  breakup: {
                    title: {
                      required: true,
                      description:
                        "the breakup title of the total quoted price",
                      reference: "if any",
                      usage: "Amount",
                    },
                    price: {
                      value: {
                        required: false,
                        description:
                          "Describes a numerical value in decimal form",
                        reference: "if any",
                        usage: "30",
                      },
                      currency: {
                        required: false,
                        description: "Describes currency value in string form",
                        reference: "if any",
                        usage: "IND",
                      },
                    },
                  },
                },
                fullfilments: {
                  customer: {
                    contact: {
                      phone: {
                        required: true,
                        description:
                          "Describes the phone information of an entity",
                        reference: "if any",
                        usage: "+91-9897867564",
                      },
                      email: {
                        required: true,
                        description: "Email address of the contact",
                        reference: "if any",
                        usage: "john.doe@example.com",
                      },
                    },
                    person: {
                      name: {
                        required: true,
                        description:
                          "Describes a person name as any individual",
                        reference: "if any",
                        usage: "John",
                      },
                    },
                  },
                },
                payments: {
                  type: {
                    required: true,
                    description: "type of the payment",
                    reference: "if any",
                    usage: "ON-FULFILLMENT",
                  },
                  url: {
                    required: false,
                    description:
                      "A payment url to be called by the BAP. If empty, then the payment is to be done offline. The details of payment should be present in the params object. If tl_method = http/get, then the payment details will be sent as url params. Two url param values, ```$transaction_id``` and ```$amount``` are mandatory.",
                    reference: "if any",
                    usage:
                      "https://pay.razorpay.com?amt=60.5&cur=INR&ref=24566345563",
                  },
                  params: {
                    amount: {
                      required: true,
                      description:
                        "Describes a numerical value in decimal form",
                      reference: "if any",
                      usage: "30",
                    },
                    currency: {
                      required: false,
                      description: "Describes currency value in string form",
                      reference: "if any",
                      usage: "IND",
                    },
                  },
                  time: {
                    range: {
                      start: {
                        required: true,
                        description: "This indicates start of a range",
                        reference: "if any",
                        usage: "2021-03-23T10:00:40.065Z",
                      },
                      end: {
                        required: true,
                        description: "This indicates end of a range",
                        reference: "if any",
                        usage: "2021-03-23T10:00:40.065Z",
                      },
                    },
                  },
                },
                cancellation_terms: {
                  cancellation_fee: {
                    percentage: {
                      required: true,
                      description: "Percentage of a value",
                      reference: "if any",
                      usage: "2%",
                    },
                  },
                  external_ref: {
                    mime_type: {
                      required: true,
                      description:
                        "indicates the nature and format of the document, file, or assortment of bytes. MIME types are defined and standardized in IETF's RFC 6838",
                      reference: "if any",
                      usage: "text/html",
                    },
                    url: {
                      required: true,
                      description: "The URL of the file",
                      reference: "if any",
                      usage:
                        "https://6vs8xnx5i7.icicibank.co.in/loans/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                    },
                  },
                },
              },
            },
          },
        },
        confirm: {
          message: {
            order: {
              provider: {
                id: {
                  required: true,
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
                },
              },
              items: {
                id: {
                  required: true,
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
                },
                xinput: {
                  form_response: {
                    status: {
                      required: true,
                      description: "Describes the status of form",
                      reference: "if any",
                      usage: true,
                    },
                    submission_id: {
                      required: true,
                      description: "Describes the uique submission id",
                      reference: "if any",
                      usage: "c844d5f4-29c3-4398-b594-8b4716ef5dbf",
                    },
                  },
                },
              },
            },
          },
        },
        on_confirm: {
          message: {
            order: {
              id: {
                required: true,
                description: "Unique human readable ID.",
                reference: "if any",
                usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
              },
              provider: {
                id: {
                  required: true,
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
                },
                descriptor: {
                  name: {
                    required: true,
                    description:
                      "Physical description of name value for something.",
                    reference: "if any",
                    usage: "Personal loan",
                  },
                  short_desc: {
                    required: false,
                    description: "Short description of value for something.",
                    reference: "if any",
                    usage: "ICICI Bank Ltd",
                  },
                  long_desc: {
                    required: false,
                    description: "Long description of value for something.",
                    reference: "if any",
                    usage: "ICICI Bank Ltd, India",
                  },
                  images: {
                    url: {
                      required: true,
                      description: "Physical description of the item",
                      reference: "if any",
                      usage: "Found drivers",
                    },
                  },
                },
                items: {
                  id: {
                    required: true,
                    description: "Unique human readable ID.",
                    reference: "if any",
                    usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
                  },
                  descriptor: {
                    name: {
                      required: true,
                      description:
                        "Physical description of name value for something.",
                      reference: "if any",
                      usage: "Personal loan",
                    },
                    short_desc: {
                      required: false,
                      description: "Short description of value for something.",
                      reference: "if any",
                      usage: "ICICI Bank Ltd",
                    },
                    long_desc: {
                      required: false,
                      description: "Long description of value for something.",
                      reference: "if any",
                      usage: "ICICI Bank Ltd, India",
                    },
                    images: {
                      url: {
                        required: true,
                        description: "Physical description of the item",
                        reference: "if any",
                        usage: "Found drivers",
                      },
                    },
                  },
                  price: {
                    value: {
                      required: false,
                      description:
                        "Describes a numerical value in decimal form",
                      reference: "if any",
                      usage: "30",
                    },
                    currency: {
                      required: false,
                      description: "Describes currency value in string form",
                      reference: "if any",
                      usage: "IND",
                    },
                  },
                },
                quote: {
                  id: {
                    required: true,
                    description: "Unique human readable ID.",
                    reference: "if any",
                    usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
                  },
                  price: {
                    value: {
                      required: false,
                      description:
                        "Describes a numerical value in decimal form",
                      reference: "if any",
                      usage: "30",
                    },
                    currency: {
                      required: false,
                      description: "Describes currency value in string form",
                      reference: "if any",
                      usage: "IND",
                    },
                  },
                  breakup: {
                    title: {
                      required: true,
                      description:
                        "the breakup title of the total quoted price",
                      reference: "if any",
                      usage: "Amount",
                    },
                    price: {
                      value: {
                        required: false,
                        description:
                          "Describes a numerical value in decimal form",
                        reference: "if any",
                        usage: "30",
                      },
                      currency: {
                        required: false,
                        description: "Describes currency value in string form",
                        reference: "if any",
                        usage: "IND",
                      },
                    },
                  },
                },
                fullfilments: {
                  customer: {
                    contact: {
                      phone: {
                        required: true,
                        description:
                          "Describes the phone information of an entity",
                        reference: "if any",
                        usage: "+91-9897867564",
                      },
                      email: {
                        required: true,
                        description: "Email address of the contact",
                        reference: "if any",
                        usage: "john.doe@example.com",
                      },
                    },
                    person: {
                      name: {
                        required: true,
                        description:
                          "Describes a person name as any individual",
                        reference: "if any",
                        usage: "John",
                      },
                    },
                  },
                },
                payments: {
                  type: {
                    required: true,
                    description: "type of the payment",
                    reference: "if any",
                    usage: "ON-FULFILLMENT",
                  },
                  url: {
                    required: false,
                    description:
                      "A payment url to be called by the BAP. If empty, then the payment is to be done offline. The details of payment should be present in the params object. If tl_method = http/get, then the payment details will be sent as url params. Two url param values, ```$transaction_id``` and ```$amount``` are mandatory.",
                    reference: "if any",
                    usage:
                      "https://pay.razorpay.com?amt=60.5&cur=INR&ref=24566345563",
                  },
                  params: {
                    amount: {
                      required: true,
                      description:
                        "Describes a numerical value in decimal form",
                      reference: "if any",
                      usage: "30",
                    },
                    currency: {
                      required: false,
                      description: "Describes currency value in string form",
                      reference: "if any",
                      usage: "IND",
                    },
                  },
                  time: {
                    range: {
                      start: {
                        required: true,
                        description: "This indicates start of a range",
                        reference: "if any",
                        usage: "2021-03-23T10:00:40.065Z",
                      },
                      end: {
                        required: true,
                        description: "This indicates end of a range",
                        reference: "if any",
                        usage: "2021-03-23T10:00:40.065Z",
                      },
                    },
                  },
                },
                cancellation_terms: {
                  cancellation_fee: {
                    percentage: {
                      required: true,
                      description: "Percentage of a value",
                      reference: "if any",
                      usage: "2%",
                    },
                  },
                  external_ref: {
                    mime_type: {
                      required: true,
                      description:
                        "indicates the nature and format of the document, file, or assortment of bytes. MIME types are defined and standardized in IETF's RFC 6838",
                      reference: "if any",
                      usage: "text/html",
                    },
                    url: {
                      required: true,
                      description: "The URL of the file",
                      reference: "if any",
                      usage:
                        "https://6vs8xnx5i7.icicibank.co.in/loans/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                    },
                  },
                },
              },
            },
          },
        },
        status: {
          message: {
            order: {
              id: {
                required: true,
                description: "Unique human readable ID.",
                reference: "if any",
                usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
              },
            },
          },
        },
        on_status: {
          message: {
            order: {
              id: {
                required: true,
                description: "Unique human readable ID.",
                reference: "if any",
                usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
              },
              provider: {
                id: {
                  required: true,
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
                },
                descriptor: {
                  name: {
                    required: true,
                    description:
                      "Physical description of name value for something.",
                    reference: "if any",
                    usage: "Personal loan",
                  },
                  short_desc: {
                    required: false,
                    description: "Short description of value for something.",
                    reference: "if any",
                    usage: "ICICI Bank Ltd",
                  },
                  long_desc: {
                    required: false,
                    description: "Long description of value for something.",
                    reference: "if any",
                    usage: "ICICI Bank Ltd, India",
                  },
                  images: {
                    url: {
                      required: true,
                      description: "Physical description of the item",
                      reference: "if any",
                      usage: "Found drivers",
                    },
                  },
                },
                items: {
                  id: {
                    required: true,
                    description: "Unique human readable ID.",
                    reference: "if any",
                    usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
                  },
                  descriptor: {
                    code: {
                      required: true,
                      description:
                        "Physical description of code value for something",
                      reference: "if any",
                      usage: "personal-loan",
                    },
                    name: {
                      required: true,
                      description:
                        "Physical description of name value for something.",
                      reference: "if any",
                      usage: "Personal loan",
                    },
                  },
                  price: {
                    value: {
                      required: false,
                      description:
                        "Describes a numerical value in decimal form",
                      reference: "if any",
                      usage: "30",
                    },
                    currency: {
                      required: false,
                      description: "Describes currency value in string form",
                      reference: "if any",
                      usage: "IND",
                    },
                  },
                  quote: {
                    id: {
                      required: true,
                      description: "Unique human readable ID.",
                      reference: "if any",
                      usage: "df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab",
                    },
                    price: {
                      value: {
                        required: false,
                        description:
                          "Describes a numerical value in decimal form",
                        reference: "if any",
                        usage: "30",
                      },
                      currency: {
                        required: false,
                        description: "Describes currency value in string form",
                        reference: "if any",
                        usage: "IND",
                      },
                    },
                    breakup: {
                      title: {
                        required: true,
                        description:
                          "the breakup title of the total quoted price",
                        reference: "if any",
                        usage: "Amount",
                      },
                      price: {
                        value: {
                          required: false,
                          description:
                            "Describes a numerical value in decimal form",
                          reference: "if any",
                          usage: "30",
                        },
                        currency: {
                          required: false,
                          description:
                            "Describes currency value in string form",
                          reference: "if any",
                          usage: "IND",
                        },
                      },
                    },
                  },
                  fullfilments: {
                    customer: {
                      contact: {
                        phone: {
                          required: true,
                          description:
                            "Describes the phone information of an entity",
                          reference: "if any",
                          usage: "+91-9897867564",
                        },
                        email: {
                          required: true,
                          description: "Email address of the contact",
                          reference: "if any",
                          usage: "john.doe@example.com",
                        },
                      },
                      person: {
                        name: {
                          required: true,
                          description:
                            "Describes a person name as any individual",
                          reference: "if any",
                          usage: "John",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        support: {
          message: {
            support: {
              ref_id: {
                required: true,
                description: "Describes ref_id for support",
                reference: "if any",
                usage: "25d26510-e46e-4a3f-968e-85d1401077f2",
              },
              phone: {
                required: true,
                description: "Describes the phone information of an entity",
                reference: "if any",
                usage: "+91-9897867564",
              },
              email: {
                required: true,
                description: "Email address of the contact",
                reference: "if any",
                usage: "john.doe@example.com",
              },
            },
          },
        },
        on_support: {
          message: {
            support: {
              ref_id: {
                required: true,
                description: "Describes ref_id for support",
                reference: "if any",
                usage: "25d26510-e46e-4a3f-968e-85d1401077f2",
              },
              phone: {
                required: true,
                description: "Describes the phone information of an entity",
                reference: "if any",
                usage: "+91-9897867564",
              },
              email: {
                required: true,
                description: "Email address of the contact",
                reference: "if any",
                usage: "john.doe@example.com",
              },
              url: {
                required: true,
                description: "The URL of the file",
                reference: "if any",
                usage:
                  "https://6vs8xnx5i7.icicibank.co.in/loans/xinput/formid/a23f2fdfbbb8ac402bfd54f",
              },
            },
          },
        },
      },
    },
  },
};
