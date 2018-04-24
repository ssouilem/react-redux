from os import getcwd, system
from subprocess import check_output
from base64 import b64decode
from docker import DockerClient as Client
from decorators import timing

CF_ENDPOINT = 'https://api.eu-gb.bluemix.net'
CF_USERNAME = 'PlateformeInnovation@open-groupe.com'
CF_PASSWORD = b64decode('YUBielFKTUhVbnI3SEp3LHQyc3gmdmlhdW1FKSFLaQ==')
DOCKER_HOSTNAME = 'swarm.dops.internal'


def get_build_version():
    return check_output('git rev-parse --short HEAD', shell=True).rstrip()


def get_build_image(image_name, version):
    return 'dops/{}:{}.{}'.format(image_name, version, get_build_version())


@timing
def build(image_name, version):
    client = Client(base_url='unix:///var/run/docker.sock', timeout=600)
    build_image = get_build_image(image_name, version)
    tags = [build_image, '{}:5000/{}'.format(DOCKER_HOSTNAME, build_image)]
    images = [client.images.build(path=getcwd(), pull=True, rm=True, tag=tag) for tag in tags]
    print 'Built {}'.format(images)


@timing
def push_to_docker(image_name, version):
    build_image = get_build_image(image_name, version)
    return system('docker push {}:5000/{}'.format(DOCKER_HOSTNAME, build_image))


@timing
def push_to_cf(image_name):
    system("cf l -a {} -u {} -p '{}' -o DOPS -s prod".format(CF_ENDPOINT, CF_USERNAME, CF_PASSWORD))
    system('cf blue-green-deploy {}'.format(image_name))
