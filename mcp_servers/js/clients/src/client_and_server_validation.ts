import {MCPServers} from "./server_connection.js"
import {ClientsConfig} from "./client_and_server_config.js"

export async function ClientAndServerValidation(payload:any, streaming_callback:any) {
    try{
        var selected_server_credentials = payload?.selected_server_credentials;
        var client_details = payload?.client_details;
        var selected_client = payload?.selected_client || "";
        var selected_servers = payload?.selected_servers || [];

        if(selected_client == "" || selected_servers.length == 0 || !selected_server_credentials || !client_details){
            console.log("Invalid Request Payload");
            return {
                "payload": null,
                "error": "Invalid Request Payload",
                "status": false
            }
        }
        for (var server of selected_servers) {
            if(!MCPServers[server]){
                console.log("Invalid Server");
                return {
                    "payload": null,
                    "error": "Invalid Server",
                    "status": false
                }
            }
        }
        if(!ClientsConfig.includes(selected_client)){
            console.log("Invalid Client");
            return {
                "payload": null,
                "error": "Invalid Client",
                "status": false
            }
        }

        var tools_arr=[];
        for (var server of selected_servers) {
            if(MCPServers[server]){
                var resource:any = await MCPServers[server].listTools();       
                for (var tool of resource.tools) {
                    // Clone the tool input schema to avoid modifying the original
                    let processedSchema = JSON.parse(JSON.stringify(tool.inputSchema || {
                        type: "object",
                        properties: {},
                        required: []
                    }));

                    // Remove credential-related parameters from the schema for LLM
                    // since the client will add them automatically via __credentials__
                    if (processedSchema.properties) {
                        // List of credential parameters to remove from LLM schema
                        const credentialParams = [
                            'apiKey', 'apiSecret', 'cloudName', 'api_token', 'user_email', 
                            'base_url', 'siteUrl', 'username', 'password', 'account_id', 
                            'client_id', 'client_secret', 'access_token', 'refresh_token',
                            'app_key', 'app_secret', 'access_token_secret', 'notion_token',
                            'slack_bot_token', 'slack_team_id', 'slack_channel_ids',
                            'jira_email', 'jira_api_token', 'jira_domain', 'project_key',
                            'email', 'token', 'subdomain', 'accessToken', 'businessAccountId',
                            'appId', 'appSecret', 'url', 'port', 'browserbaseApiKey', 
                            'browserbaseProjectId', 'figma_url', 'depth', 'domain'
                        ];
                        
                        credentialParams.forEach(param => {
                            if (processedSchema.properties[param]) {
                                delete processedSchema.properties[param];
                            }
                        });

                        // Also remove these from required array if present
                        if (processedSchema.required && Array.isArray(processedSchema.required)) {
                            processedSchema.required = processedSchema.required.filter(
                                (req: string) => !credentialParams.includes(req)
                            );
                        }
                    }

                    tools_arr.push({
                        type: "function",
                        function: {
                          name: tool.name,
                          description: tool.description || `Tool for ${tool.name}`,
                          parameters: processedSchema
                        }
                      });    
                }
            }
        }
        client_details["tools"] = tools_arr;

        return {
            "payload": {
                "selected_client": selected_client,
                "selected_servers": selected_servers,
                "selected_server_credentials": selected_server_credentials,
                "client_details": client_details
            },
            "error": null,
            "status": true
        }
    } catch (err) {
        console.log("Error initializing MCP ==========>>>> " , err);
        return {
            "payload": null,
            "error": err,
            "status": false
        }
    }
}