
# Como executar as VMs no seu hserver

## 1. Instalar dependências

Antes de tudo, baixe as dependências:

```bash
sudo apt install virt-manager qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils -y
```
## 2. Criar interface bridge no host

Neste experimento, o servidor possui duas interfaces: uma Ethernet e outra Wi-Fi. A Ethernet está conectada à rede e foi utilizada para a criação da device `virtbr0`. Siga os passos de execução anteriores e adapte ao seu contexto.

- **Lan1**: rede bridge que aponta para a device `virtbr0`
- **Lan2**: rede isolada para a comunicação entre as VMs, definida da seguinte forma:

```xml
<network>
  <name>lan2</name>
  <uuid>d693d09f-0f54-4764-9a1a-80c0135663d8</uuid>
  <bridge name="virbr1" stp="on" delay="0"/>
  <mac address="52:54:00:6a:83:9d"/>
  <domain name="lan2"/>
  <ip address="192.168.100.1" netmask="255.255.255.0">
    <dhcp>
      <range start="192.168.100.128" end="192.168.100.254"/>
    </dhcp>
  </ip>
</network>
```

Crie um arquivo com a estrutura acima e defina a rede com os comandos:

```bash
virsh net-define /caminho/para/arquivo-da-rede.xml
virsh net-start nome-da-rede
virsh net-autostart nome-da-rede
```

## 3. Passo a passo para execução das VMs

1. **Clonar o repositório**
2. **Baixar os discos virtuais** [Link do drive com os discos virtuais](https://drive.google.com/file/d/1Ayk3iSooceG_2-b537EwOl_uD4pDoA5-/view?usp=sharing)
3. **Extrair os arquivos para o caminho** `/var/lib/libvirt/images/`
4. **Verificar** se o diretório contém os bancos virtuais e os arquivos `.xml` das VMs (1, 2 e 3)
5. **Executar o script `init-vms.sh`** com permissões de execução:

```bash
chmod +x init-vms.sh
./init-vms.sh
```

Esse procedimento irá restaurar e registrar as VMs no `libvirt`.

## 4. Iniciar as VMs

Após a execução do script, você poderá iniciar as VMs com os comandos:

```bash
virsh start VM1
virsh start VM2
virsh start VM3
```
