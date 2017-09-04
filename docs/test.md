# Title12

content text...

```xml
<?xml version="1.0"?>
<!DOCTYPE mycat:schema SYSTEM "schema.dtd">
<mycat:schema xmlns:mycat="http://io.mycat/">
	<schema name="doubaSchema" checkSQLschema="false" sqlMaxLimit="100" dataNode="dn1"></schema>
	
	<dataNode name="dn1" dataHost="dh1" database="douba" />
	
	<dataHost name="dh1" maxCon="500" minCon="20" balance="1" writeType="0" dbType="mysql" dbDriver="native" switchType="2" slaveThreshold="100">
		<heartbeat>show slave status</heartbeat>
		
		<writeHost host="hostM41" url="192.168.2.41:3306" user="root" password="123456" >
			<readHost host="hostS42" url="192.168.2.42:3306" user="root" password="123456" />
			<readHost host="hostS43" url="192.168.2.43:3306" user="root" password="123456" />
		</writeHost>
	</dataHost>
</mycat:schema>
```

## Title2

### Title3
