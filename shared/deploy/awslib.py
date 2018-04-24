from urllib2 import urlopen
from boto.ec2 import connect_to_region


def get_public_ip_address():
    return urlopen('https://api.ipify.org/').read()


def authorize_connections(conn, security_group, port):
    conn.authorize_security_group(group_id='{}'.format(security_group),
                                  ip_protocol='tcp',
                                  from_port=port,
                                  to_port=port,
                                  cidr_ip='{}/32'.format(get_public_ip_address()))


def revoke_connections(conn, security_group, port):
    conn.revoke_security_group(group_id='{}'.format(security_group),
                               ip_protocol='tcp',
                               from_port=port,
                               to_port=port,
                               cidr_ip='{}/32'.format(get_public_ip_address()))


def open_connection():
    conn = connect_to_region('eu-west-1')
    return conn


def stop_task(conn, cluster):
    client = conn.client('ecs')
    response = client.list_tasks(cluster=cluster)
    if len(response.taskArns) > 0:
        client.stop_task(cluster=cluster, task=response.taskArns[0])
