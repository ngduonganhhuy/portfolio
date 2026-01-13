---
title: Best practices writing Clean Code with Flutter 💻
date: "2023-10-30"
time: 9 min read
cover: /images/articles/best_practice_writing_clean_code_with_flutter.webp
tags:
  - Flutter
  - Clean Code
---

📖 Flutter is an open-source mobile application development SDK created by Google, facilitates cross-platform app creation for Android and iOS. Writing clean code with Flutter can be tricky, particularly for novices in the framework or Dart. In this article, we'll share tips for crafting clear, maintainable, and scalable Flutter code.

### Why clean code with Flutter ?

> To improves code readability and maintainability, making it easier for other devs to understand the purpose and functionality of our code

### Use meaningful and easy pronounceable variable names

> Clear and meaningful variable names make your code more readable and understandable. Facilitating comprehension for both yourself and others who may read it later

```dart

//! BAD

final yyyyMMddstring = DateFormat('yyyy/MM/dd').format(DateTime.now());

//* GOOD

final currentDate = DateFormat('yyyy/MM/dd').format(DateTime.now());

```

### Use [Future.wait](https://api.flutter.dev/flutter/dart-async/Future/wait.html) to make concurrent API calls

> By using [Future.wait](https://api.flutter.dev/flutter/dart-async/Future/wait.html), you can initiate multiple async tasks at the same time. Thereby reducing the overall execution time

```dart

//! BAD

Future callMultipleApis() async {
  await getUserInfo();
  await getLocations();
}

//* GOOD

Future callMultipleApis() async {
  await Future.wait([
    getUserInfo(),
    getLocations(),
  ]);
}

```

### Use searchable names

```dart

//! BAD

Future.delayed(const Duration(minutes: 30), () {
  debugPrint('some logic here');
});

//* GOOD

const MINUTES_DURATION = 30;

Future.delayed(const Duration(minutes: MINUTES_DURATION), () {
  debugPrint('some logic');
});

//----OR----

const HALF_AN_HOUR = Duration(minutes: 30);

Future.delayed(HALF_AN_HOUR, () {
  debugPrint('some logic');
});

```

### Use explanatory variables

First, we have class `Person` and `saveInfo()` in that class:

```dart

class Person {
  Person({
    required this.fullName,
    required this.age,
    required this.email,
  });

  final String fullName;
  final String age;
  final String email;

  void saveInfo() {
    final fullName = this.fullName;
    final age = this.age;
    final email = this.email;

    debugPrint('''
      'Fullname': $fullName
      'Age': $age
      'Email': $email
    ''')};
}

```

and

```dart

const info = ['John', '31', 'john@dev.to'];

```

how to use explanatory variables:

```dart

//! BAD

final infoPerson = Person(fullName: info[0], age: info[1], email: info[2]);

infoPerson.saveInfo();

//* GOOD

final fullName = info[0];
final age = info[1];
final email = info[2];
final infoPerson = Person(fullName: fullName, age: age, email: email)
..saveInfo();

```

### Avoid mental mapping

We have a list that contains staff names

```dart

const staffs = ['Holmes', 'Dane', 'Dyno', 'Maker'];

```

and we perform some actions with this list

```dart

//! BAD

for (final n in staffs) {
  doSomething();
  //...
  //...
  //...
  //...
  //...
  //...
  //"n" is defined as what?
  doStuff(n);
}

//* GOOD

for (final staffName in staffs) {
  doSomething();
  //...
  //...
  //...
  //...
  //...
  //...
  doStuff(staffName);
}

```

### Prefer default parameters over short-circuiting or conditionals

> Default arguments are generally preferable to short-circuiting. However, it's important to note that using default arguments means that your function will only assign default values to undefined arguments.

```dart

//! BAD

void logErrorWithDefaultInternal({String? errorText}) {
  print(errorText ?? 'Internal Server Error');
}

//* GOOD

void logErrorWithDefaultInternal({String errorText = 'Internal Server Error'}){
   print(errorText);
}

```

### Single responsibility principle

We have:

```dart

const numbers = [33, 10, 99, 275, -100, 9000, -300];

```

We create the function that return a list contains number is odd and positive:

```dart

//!BAD

List getGenericNumbers() {
  final result = numbers.where((number) {
    if (number.isOdd && number > 0) {
      return true;
    }
    return false;
  }).toList();
  return result;
}

//!GOOD

bool checkNumberIsOddAndPositive(int number) {
  return number.isOdd && number > 0;
}

List getListPositiveOddNumbers() {
  final result = numbers.where(checkNumberIsOddAndPositive).toList();
  return result;
}

```
### Don't make duplicate code
> Avoid duplicate code as much as possible. Duplications can complicate maintenance and updates, leading to inconsistencies. Instead, create a solid abstraction that can handle multiple scenarios with a single function or module. However, ensure that the abstraction is well-designed and follows the SOLID principles.

First, we have 3 classes `Person`, `Student`, `Teacher`. `Student` and `Teacher` both extend `Person`

```dart

class Person {}

class Student extends Person {
  //properties...
}

class Teacher extends Person {
  //properties...
}

```

and then, how does duplicate code occur

```dart

//! BAD

Widget _buildAvatarStudent() {
  return Image.asset('assets/images/student.png');
}

Widget _buildAvatarTeacher() {
  return Image.asset('assets/images/teacher.png');
}

//! GOOD

Widget _buildAvatar(Person person) {
  String image = 'assets/images/placeholder.png';
  if (person is Student) {
    image = 'assets/images/student.png';
  } else if (person is Teacher) {
    image = 'assets/iamges/teacher.png';
  }
  return Image.asset(image);
}

//----------DART 3------------

Widget _buildAvatar(Person person) {
  String image = switch(person) => {
    Student() => 'assets/images/student.png',
    Teacher() => 'assets/images/teacher.png',
    _ =>  'assets/images/placeholder.png'
  };

  return Image.asset(image);
}

```

Hope y'all enjoyed :)
