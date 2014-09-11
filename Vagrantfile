# detailed instructions for installing
$script = <<SCRIPT

sudo -i
## Install Node.js ##
# https://github.com/joyent/node/wiki/installing-node.js-via-package-manager
add-apt-repository ppa:chris-lea/node.js

# update ubuntu (security etc.)
apt-get update

apt-get -y install g++ git git-core nodejs


## Open Java ##
apt-get install -y openjdk-6-jre

# http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/setup-repositories.html
wget -qO - http://packages.elasticsearch.org/GPG-KEY-elasticsearch | sudo apt-key add -

echo "deb http://packages.elasticsearch.org/elasticsearch/1.3/debian stable main" >> /etc/apt/sources.list
apt-get update && apt-get install -y elasticsearch

/etc/init.d/elasticsearch start

SCRIPT


Vagrant.configure("2") do |config|

  # config.vm.box = "base"
  config.vm.box = "ubuntu-nodejs-server"
  config.vm.box_url = "https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box"

  config.vm.network :forwarded_port, guest: 3000, host: 3000
  config.vm.network :forwarded_port, guest: 9200, host: 9200
  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network :private_network, ip: "192.168.33.10"
  config.vm.provision :shell, :inline => $script

end
