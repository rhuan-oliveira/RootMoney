import 'package:flutter/material.dart';

class FirstPage extends StatefulWidget {
  @override
  FirstPageState createState() => FirstPageState();
}

class FirstPageState extends State<FirstPage> {
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(children: <Widget>[
        Image.asset(
          'assets/images/background.png',
          fit: BoxFit.cover,
          width: double.infinity,
          height: double.infinity,
        ),
        SafeArea(
            child: Column(children: <Widget>[
          Container(
            margin: EdgeInsets.only(top: 350, left: 40),
            child: Stack(
              children: <Widget>[
                Image.asset(
                  'assets/images/logo.png',
                  width: 50,
                  height: 50,
                ),
                Container(
                  margin: EdgeInsets.only(top: 12, left: 18),
                  child: Text(
                    'RootMoney',
                    style: TextStyle(
                      fontSize: 45,
                      fontWeight: FontWeight.w400,
                      color: Colors.white,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ]))
      ]),
      bottomNavigationBar: SizedBox(
        height: 80,
        child: Row(
          children: <Widget>[
            Expanded(
              child: Center(
                  child: ButtonTheme(
                      minWidth: 170.0, 
                      height: 45.0,
                      child: RaisedButton(
                        color: Colors.white,
                        child: Text(
                          'LOG IN',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w900,
                            color: Colors.black,
                          ),
                        ),
                        onPressed: () => {},
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(5.0),
                            side: BorderSide(color: Colors.black)),
                        highlightColor: Colors.black,
                      ))),
            ),
            Expanded(
              child: Center(
                  child: ButtonTheme(
                      minWidth: 170.0, 
                      height: 45.0,
                      child: RaisedButton(
                        color: Colors.black,
                        child: Text(
                          'CADASTRAR',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w900,
                            color: Colors.white,
                          ),
                        ),
                        onPressed: () => {},
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(5.0),
                            side: BorderSide(color: Colors.black)),
                        highlightColor: Colors.white,
                      ))),
            ),
          ],
        ),
      ),
    );
  }
}
