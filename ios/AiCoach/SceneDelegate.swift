import UIKit
import React

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
  var window: UIWindow?

  func scene(
    _ scene: UIScene,
    willConnectTo session: UISceneSession,
    options connectionOptions: UIScene.ConnectionOptions
  ) {
    guard let windowScene = scene as? UIWindowScene,
          let appDelegate = UIApplication.shared.delegate as? AppDelegate
    else { return }

    let window = UIWindow(windowScene: windowScene)
    window.backgroundColor = UIColor { traitCollection in
      traitCollection.userInterfaceStyle == .dark
        ? UIColor(red: 11.0 / 255, green: 11.0 / 255, blue: 12.0 / 255, alpha: 1)
        : UIColor(red: 252.0 / 255, green: 252.0 / 255, blue: 252.0 / 255, alpha: 1)
    }

    appDelegate.reactNativeFactory?.startReactNative(
      withModuleName: "AiCoach",
      in: window,
      launchOptions: nil
    )

    self.window = window
    appDelegate.window = window
  }
}
