# Gateway API Migration

This directory contains the migration from NGINX Ingress to Kubernetes Gateway API.

## Files

- `gateway.yaml` - Gateway API configuration for mandatkollen.se
- `gateway-eu.yaml` - Gateway API configuration for mandatkollen.eu
- `ingress.yaml` - Original NGINX Ingress (deprecated)
- `ingress-eu.yaml` - Original NGINX Ingress for EU (deprecated)

## Migration Benefits

Gateway API provides several advantages over NGINX Ingress:

1. **Role-oriented API** - Separates concerns between infrastructure providers, cluster operators, and application developers
2. **Expressive features** - Built-in support for advanced routing, traffic splitting, and header manipulation without annotations
3. **Portable** - Standardized API across implementations
4. **Extensible** - Clean extension points for custom features
5. **Better security model** - Granular permissions and multi-tenant support

## Installation

### Prerequisites

Install Gateway API CRDs and a Gateway controller:

```bash
# Install Gateway API CRDs
kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.1.0/standard-install.yaml

# Install NGINX Gateway Controller (recommended for migration)
helm repo add nginx-gateway https://kubernetes.github.io/gateway-api
helm install nginx-gateway nginx-gateway/gateway-api \
  --namespace nginx-gateway --create-namespace
```

### Deploy Gateway Configuration

```bash
# Apply the new Gateway API configuration
kubectl apply -f gateway.yaml
kubectl apply -f gateway-eu.yaml

# Verify the resources
kubectl get gateway -n mandatkollen
kubectl get httproute -n mandatkollen
```

### Migration Steps

1. Install Gateway API CRDs and controller
2. Deploy Gateway configuration alongside existing Ingress
3. Test traffic routing through Gateway
4. Update DNS to point to Gateway load balancer
5. Remove old Ingress resources

## Configuration Details

### Gateway Resources

- **GatewayClass**: Defines the controller implementation
- **Gateway**: Defines the entry points (listeners) with TLS termination
- **HTTPRoute**: Defines routing rules for each hostname
- **TLS Redirect**: Automatic HTTP to HTTPS redirection

### Features Preserved

- TLS termination with cert-manager integration
- Automatic DNS registration with external-dns
- HTTP to HTTPS redirects
- Support for both mandatkollen.se and mandatkollen.eu domains
- Same backend services routing

## Rollback

If needed, you can rollback to NGINX Ingress:

```bash
# Remove Gateway resources
kubectl delete -f gateway.yaml
kubectl delete -f gateway-eu.yaml

# Re-apply Ingress resources
kubectl apply -f ingress.yaml
kubectl apply -f ingress-eu.yaml
```